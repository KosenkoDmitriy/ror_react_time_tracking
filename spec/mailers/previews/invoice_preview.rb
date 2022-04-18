# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/invoice

class InvoicePreview < ActionMailer::Preview
  def invoice
    invoice = Invoice.first
    recipients = [invoice.client.email, "miru@example.com"]
    subject = "Invoice (#{invoice.invoice_number}) due on #{invoice.due_date}"

    InvoiceMailer.with(invoice:, recipients:, subject:).invoice
  end
end
