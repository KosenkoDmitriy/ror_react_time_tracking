import React, { useState } from "react";

import dayjs from "dayjs";
import { currencyFormat, useDebounce } from "helpers";
import { DotsThreeVerticalIcon } from "miruIcons";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge } from "StyledComponents";

import CustomCheckbox from "common/CustomCheckbox";
import getStatusCssClass from "utils/getBadgeStatus";

import MoreOptions from "../MoreOptions";
import SendInvoice from "../SendInvoice";

const TableRow = ({
  invoice,
  isSelected,
  selectInvoices,
  deselectInvoices,
  setShowDeleteDialog,
  setInvoiceToDelete,
  fetchInvoices,
  isDesktop,
  index,
}) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  useDebounce(isMenuOpen, 500);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    if (isSelected) {
      deselectInvoices([invoice.id]);
    } else {
      selectInvoices([invoice.id]);
    }
  };

  const hanldeOnClick = e => {
    e.stopPropagation();
  };

  const formattedDate = date => dayjs(date).format(invoice.company.dateFormat);

  return (
    <tr
      className="group cursor-pointer last:border-b-0 hover:bg-miru-gray-100"
      data-cy="view-invoice"
      key={index}
      onClick={() => {
        if (isDesktop) {
          navigate(`/invoices/${invoice.id}`);
        }
      }}
    >
      <td className="px-0 py-0">
        <CustomCheckbox
          isUpdatedDesign
          checkboxValue={isSelected}
          handleCheck={handleCheckboxChange}
          hanldeOnClick={hanldeOnClick}
          id={invoice.id}
          isChecked={isSelected}
          text=""
          wrapperClassName="h-8 w-8 m-auto rounded-3xl p-2 hover:bg-miru-gray-1000"
        />
      </td>
      <td className="flex cursor-pointer items-center whitespace-nowrap py-5 pr-6 text-left font-medium tracking-normal lg:w-1/3 lg:pr-2">
        {isDesktop && <Avatar />}
        <div className="ml-2 lg:ml-10">
          <span className="text-xs font-normal capitalize text-miru-dark-purple-1000 lg:text-base lg:font-semibold">
            {invoice.client.name}
          </span>
          <h3 className="text-xs font-medium text-miru-dark-purple-400 lg:text-sm">
            {invoice.invoiceNumber}
          </h3>
        </div>
      </td>
      {isDesktop && (
        <td className="w-1/4 whitespace-nowrap px-4 py-5 font-medium tracking-normal lg:px-6">
          <h1 className="text-xs font-normal text-miru-dark-purple-1000 lg:text-base lg:font-semibold">
            {formattedDate(invoice.issueDate)}
          </h1>
          <h3 className="text-xs font-medium text-miru-dark-purple-400 lg:text-sm">
            Due on {formattedDate(invoice.dueDate)}
          </h3>
        </td>
      )}
      <td className="px-2 text-right text-sm font-bold tracking-normal text-miru-dark-purple-1000 lg:w-1/6 lg:px-6 lg:pt-2 lg:pb-7 lg:text-xl">
        {currencyFormat(invoice.company.baseCurrency, invoice.amount)}
      </td>
      <td
        className="relative px-2 text-right font-medium lg:px-6 lg:pb-10"
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        {isDesktop && (
          <MoreOptions
            invoice={invoice}
            isDesktop={isDesktop}
            isMenuOpen={isMenuOpen}
            isSending={isSending}
            setInvoiceToDelete={setInvoiceToDelete}
            setIsMenuOpen={setIsMenuOpen}
            setIsSending={setIsSending}
            setShowDeleteDialog={setShowDeleteDialog}
            setShowMoreOptions={setShowMoreOptions}
          />
        )}
        <Badge
          className={`${getStatusCssClass(invoice.status)} uppercase`}
          text={invoice.status}
        />
      </td>
      {!isDesktop && (
        <td className="text-right text-sm text-miru-dark-purple-1000">
          <button
            onClick={() => {
              setShowMoreOptions(true);
            }}
          >
            <DotsThreeVerticalIcon size={26} />
          </button>
        </td>
      )}
      {!isDesktop && showMoreOptions && (
        <MoreOptions
          invoice={invoice}
          isDesktop={isDesktop}
          isMenuOpen={isMenuOpen}
          isSending={isSending}
          setInvoiceToDelete={setInvoiceToDelete}
          setIsMenuOpen={setIsMenuOpen}
          setIsSending={setIsSending}
          setShowDeleteDialog={setShowDeleteDialog}
          setShowMoreOptions={setShowMoreOptions}
        />
      )}
      {isSending && (
        <SendInvoice
          isSending
          fetchInvoices={fetchInvoices}
          invoice={invoice}
          setIsSending={setIsSending}
        />
      )}
    </tr>
  );
};

export default TableRow;
