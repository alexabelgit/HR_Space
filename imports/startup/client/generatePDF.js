import jsPDF from 'jspdf';
/**
 * Function for generating a PDF file with from data
 * @param {Object} form Form object
 * @param {String} form.name Form name
 * @param {Array<Object>} form.rows Rows
 */
export const generatePDF = form => {
    var doc = new jsPDF();

    doc.setFont('Helvetica');
    doc.setFontSize(24);
    doc.text(form.name, 60, 20);

    doc.setFontSize(14);

    var offsetY = 40;

    form.rows.forEach((row, index) => {
        let { label, value = '' } = row;
        let lineHeight = doc.getTextDimensions(label).h;

        label = doc.splitTextToSize(label + ': ', 100);
        value = doc.splitTextToSize(value, 80);

        const prevLabel = index && doc.splitTextToSize(form.rows[index - 1].label, 100);
        const prevValue = index && doc.splitTextToSize(form.rows[index - 1].value, 80);

        if (index && (prevLabel.length > 1) || (prevValue.length > 1)) {
            let labelHeight = doc.getTextDimensions(form.rows[index - 1].label).h * prevLabel.length;
            let valueHeight = doc.getTextDimensions(form.rows[index - 1].value).h * prevValue.length;

            if (labelHeight > valueHeight) {
                lineHeight = labelHeight;
            } else {
                lineHeight = valueHeight;
            }

            offsetY += lineHeight - 20;
        } else {
            offsetY += lineHeight - 10;
        }

        doc.text(label, 10, offsetY);
        doc.text(value, 120, offsetY);
    });

    return doc.output('blob');
};