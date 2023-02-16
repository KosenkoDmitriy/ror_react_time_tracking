# == Schema Information
#
# Table name: companies
#
#  id              :bigint           not null, primary key
#  address         :text             not null
#  base_currency   :string           default("USD"), not null
#  business_phone  :string
#  country         :string           not null
#  date_format     :string
#  fiscal_year_end :string
#  name            :string           not null
#  standard_price  :decimal(, )      default(0.0), not null
#  timezone        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

# frozen_string_literal: true

class Company < ApplicationRecord
  # Associations
  has_many :employments, dependent: :destroy
  has_many :users, -> { kept }, through: :employments
  has_many :timesheet_entries, through: :users
  has_many :clients, dependent: :destroy
  has_many :projects, through: :clients, dependent: :destroy
  has_many :current_workspace_users, foreign_key: "current_workspace_id", class_name: "User", dependent: :nullify
  has_one_attached :logo
  has_many :timesheet_entries, through: :clients
  has_many :invoices
  has_many :payments, through: :invoices
  has_one :stripe_connected_account, dependent: :destroy
  has_many :payments_providers, dependent: :destroy
  has_many :addresses, as: :addressable, dependent: :destroy
  has_many :devices, dependent: :destroy
  has_many :invitations, dependent: :destroy
  has_many :expenses, dependent: :destroy
  has_many :expense_categories, dependent: :destroy
  has_many :vendors, dependent: :destroy
  resourcify

  # Validations
  validates :name, :business_phone, :standard_price, :country, :base_currency, presence: true
  validates :standard_price, numericality: { greater_than_or_equal_to: 0 }

  # scopes
  scope :with_kept_employments, -> { merge(Employment.kept) }
  scope :valid_invitations, -> { where(company: self).valid_invitations }

  def client_list
    clients.kept.map do |client|
      { id: client.id, name: client.name, email: client.email, phone: client.phone, address: client.address }
    end
  end

  def overdue_and_outstanding_and_draft_amount
    currency = base_currency
    status_and_amount = invoices.group(:status).sum(:amount)
    status_and_amount.default = 0
    outstanding_amount = status_and_amount["sent"] + status_and_amount["viewed"] + status_and_amount["overdue"]
    {
      overdue_amount: status_and_amount["overdue"],
      outstanding_amount:,
      draft_amount: status_and_amount["draft"],
      currency:
    }
  end

  def company_logo
    return nil if !logo.attached?

    Rails.application.routes.url_helpers.polymorphic_url(logo, only_path: true)
  end

  def stripe_account_id
    stripe_connected_account&.account_id
  end
end
