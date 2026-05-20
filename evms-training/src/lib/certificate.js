/**
 * Generate a simple completion certificate PDF (no external dependencies).
 */

function escapePdfText(text) {
	return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

/**
 * @param {{ learnerName: string; pathTitle: string; completedOn: string; hoursEstimate: string }} opts
 * @returns {Blob}
 */
export function buildCertificatePdf(opts) {
	const { learnerName, pathTitle, completedOn, hoursEstimate } = opts;
	const lines = [
		'EVMS Training — Completion Certificate',
		'',
		`This certifies that ${learnerName}`,
		`has completed: ${pathTitle}`,
		`Date: ${completedOn}`,
		`Estimated contact hours: ${hoursEstimate}`,
		'',
		'Disclaimer: This interactive practice tool supplements formal training.',
		'Contact hours and PDUs depend on your certifying body (PMI, etc.).',
		'Content aligns with EIA-748 intent and PMI Practice Standard teaching language.'
	];

	let y = 750;
	const contentLines = lines
		.map(function lineToPdf(l) {
			const cmd = `BT /F1 12 Tf 72 ${y} Td (${escapePdfText(l)}) Tj ET`;
			y -= l === '' ? 18 : 22;
			return cmd;
		})
		.join('\n');

	const stream = `${contentLines}\n`;
	const streamLen = new TextEncoder().encode(stream).length;

	const pdf = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length ${streamLen}>>stream
${stream}
endstream endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000${(350 + streamLen).toString().padStart(3, '0')} 00000 n 
trailer<</Size 6/Root 1 0 R>>
startxref
${400 + streamLen}
%%EOF`;

	return new Blob([pdf], { type: 'application/pdf' });
}

export function downloadCertificatePdf(opts, filename = 'evms-training-certificate.pdf') {
	const blob = buildCertificatePdf(opts);
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	URL.revokeObjectURL(url);
}
