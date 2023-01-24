import React, { useRef } from "react";

import { useOutsideClick } from "helpers";
import {
  PaperPlaneTiltIcon,
  DeleteIcon,
  PrinterIcon,
  PenIcon,
  DotsThreeVerticalIcon,
  DownloadSimpleIcon,
} from "miruIcons";
import { Link } from "react-router-dom";
import { Tooltip } from "StyledComponents";

import { handleDownloadInvoice } from "../common/utils";

const MoreOptions = ({
  setShowDeleteDialog,
  setInvoiceToDelete,
  invoice,
  isMenuOpen,
  setIsMenuOpen,
  setIsSending,
  isSending,
  isDesktop,
  setShowMoreOptions,
}) => {
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => {
    setShowMoreOptions(false);
  });

  return isDesktop ? (
    <>
      <div
        className="absolute bottom-16 right-0 flex hidden items-center justify-between rounded-xl border-2 border-miru-gray-200 bg-white lg:w-28 lg:p-2 lg:group-hover:flex xl:w-40 xl:p-3"
        onClick={e => e.stopPropagation()}
      >
        <Tooltip content="Send To">
          <button
            className="text-miru-han-purple-1000"
            onClick={() => {
              setIsSending(!isSending);
            }}
          >
            <PaperPlaneTiltIcon size={16} weight="bold" />
          </button>
        </Tooltip>
        <Tooltip content="Download">
          <button
            data-cy="invoice-download"
            disabled={invoice.status == "draft"}
            className={
              invoice.status == "draft"
                ? "text-miru-gray-1000"
                : "text-miru-han-purple-1000"
            }
            onClick={e => {
              e.stopPropagation();
              handleDownloadInvoice(invoice);
            }}
          >
            <DownloadSimpleIcon size={16} weight="bold" />
          </button>
        </Tooltip>
        <Tooltip content="Edit">
          <Link
            className="text-miru-han-purple-1000"
            data-cy="edit-invoice"
            to={`/invoices/${invoice.id}/edit`}
            type="button"
            onClick={e => e.stopPropagation()}
          >
            <PenIcon size={16} weight="bold" />
          </Link>
        </Tooltip>
        <Tooltip content="More">
          <button
            className={`p-2  text-miru-han-purple-1000 ${
              isMenuOpen && `bg-miru-gray-100`
            }`}
            onClick={e => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <DotsThreeVerticalIcon size={16} weight="bold" />
          </button>
        </Tooltip>
      </div>
      {isMenuOpen && (
        <div
          className="absolute top-4 right-0 z-10 flex-col items-end group-hover:flex"
          onClick={e => e.stopPropagation()}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <div className="hidden overflow-hidden lg:w-10 xl:w-12">
            <div className="h-6 w-6 origin-bottom-left rotate-45 transform border-2 border-miru-gray-200 bg-white" />
          </div>
          <ul
            className="mt-1 rounded-lg border-miru-gray-200 bg-white shadow-c1 lg:py-3 xl:py-4"
            onClick={e => e.stopPropagation()}
          >
            <li className="flex cursor-pointer items-center px-5 text-sm text-miru-han-purple-1000 hover:bg-miru-gray-100 lg:py-1 xl:py-2">
              <PrinterIcon
                className="text-miru-han-purple-1000 lg:mr-2 xl:mr-4"
                size={16}
                weight="bold"
              />
              Print
            </li>
            <li
              className="flex cursor-pointer items-center px-5 text-sm text-miru-red-400 hover:bg-miru-gray-100 lg:py-1 xl:py-2"
              onClick={() => {
                setShowDeleteDialog(true);
                setInvoiceToDelete(invoice.id);
              }}
            >
              <DeleteIcon
                className="text-miru-red-400 lg:mr-2 xl:mr-4"
                size={16}
                weight="bold"
              />
              Delete
            </li>
            <li className="flex cursor-pointer items-center px-5 text-sm text-miru-han-purple-1000 hover:bg-miru-gray-100 lg:py-1 xl:py-2">
              <PaperPlaneTiltIcon
                className="text-miru-han-purple-1000 lg:mr-2 xl:mr-4"
                size={16}
                weight="bold"
              />
              Send link
            </li>
          </ul>
        </div>
      )}
    </>
  ) : (
    <div
      className="modal__modal main-modal "
      style={{ background: "rgba(29, 26, 49,0.6)" }}
    >
      <ul className="shadow-2 w-full rounded-lg bg-white p-4" ref={wrapperRef}>
        <li>
          <button
            className="flex cursor-pointer items-center py-2 text-miru-han-purple-1000"
            onClick={() => setIsSending(!isSending)}
          >
            <PaperPlaneTiltIcon className="mr-4" size={16} /> Send Invoice
          </button>
        </li>
        <li className="flex cursor-pointer items-center py-2">
          <button
            data-cy="invoice-download"
            disabled={invoice.status == "draft"}
            className={
              invoice.status == "draft"
                ? "flex cursor-pointer items-center py-2 text-miru-gray-1000"
                : "flex cursor-pointer items-center py-2 text-miru-han-purple-1000"
            }
            onClick={() => handleDownloadInvoice(invoice)}
          >
            <DownloadSimpleIcon className="mr-4" size={16} /> Download Invoice
          </button>
        </li>
        <li>
          <Link
            className="flex cursor-pointer items-center py-2 text-miru-han-purple-1000"
            data-cy="edit-invoice"
            to={`/invoices/${invoice.id}/edit`}
            type="button"
          >
            <PenIcon className="mr-4" size={16} /> Edit Invoice
          </Link>
        </li>
        <li className="flex cursor-pointer items-center py-2 text-miru-han-purple-1000">
          <PrinterIcon className="mr-4" size={16} />
          Print
        </li>
        <li className="flex cursor-pointer items-center py-2 text-miru-han-purple-1000">
          <PaperPlaneTiltIcon className="mr-4" size={16} />
          Send link
        </li>
        <li
          className="flex cursor-pointer items-center py-2 text-miru-red-400"
          onClick={() => {
            setShowDeleteDialog(true);
            setInvoiceToDelete(invoice.id);
          }}
        >
          <DeleteIcon className="mr-4 text-miru-red-400" size={16} />
          Delete
        </li>
      </ul>
    </div>
  );
};

export default MoreOptions;
