/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from "react";

import {
  CaretDownIcon,
  FileCsvIcon,
  FilePdfIcon,
  FilterIcon,
  PrinterIcon,
  ShareIcon,
  XIcon,
  PaperPlaneTiltIcon,
  ArrowLeftIcon,
  DotsThreeVerticalIcon,
} from "miruIcons";
import { Link } from "react-router-dom";
import { MobileMoreOptions } from "StyledComponents";

import { useUserContext } from "context/UserContext";

import { getReports } from "./fetchReport";
import NavigationFilter from "./NavigationFilter";

import { useEntry } from "../context/EntryContext";

const Header = ({
  setIsFilterVisible,
  isFilterVisible,
  showNavFilters,
  resetFilter,
  handleDownload,
  type,
  showExportButon,
}) => {
  const {
    timeEntryReport,
    revenueByClientReport,
    currentReport,
    outstandingOverdueInvoice,
    accountsAgingReport,
  } = useEntry();

  const selectedReport = getReports({
    currentReport,
    timeEntryReport,
    revenueByClientReport,
    outstandingOverdueInvoice,
    accountsAgingReport,
  });

  const [showExportOptions, setShowExportOptions] = useState<boolean>(false);
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const { isDesktop } = useUserContext();

  return (
    <div>
      <div className="sticky top-0 right-0 left-0 mt-0 mb-3 flex items-center justify-between bg-white px-4 py-2 shadow-c1 lg:static lg:mt-6 lg:bg-transparent lg:px-0 lg:shadow-none">
        <div className="flex w-full items-center justify-between lg:w-auto">
          <Link to="/reports" type="button">
            <ArrowLeftIcon />
          </Link>
          <span className="w-full py-1 px-3 text-left text-base font-medium leading-5 text-miru-dark-purple-1000 lg:ml-5 lg:truncate lg:px-0 lg:text-center lg:text-2xl lg:font-bold  lg:leading-10">
            {type}
          </span>
          <button className="relative rounded p-3 hover:bg-miru-gray-1000 lg:ml-7">
            {isDesktop ? (
              <>
                <FilterIcon
                  color="#7C5DEE"
                  size={16}
                  onClick={() => {
                    setIsFilterVisible(!isFilterVisible);
                  }}
                />
                {selectedReport.filterCounter > 0 && (
                  <sup className="filter__counter">
                    {selectedReport.filterCounter}
                  </sup>
                )}
              </>
            ) : (
              <DotsThreeVerticalIcon onClick={() => setShowMoreOptions(true)} />
            )}
          </button>
          {showMoreOptions && (
            <MobileMoreOptions setVisibilty={setShowMoreOptions}>
              <li
                className="flex items-center p-2 text-miru-han-purple-1000"
                onClick={() => {
                  setIsFilterVisible(!isFilterVisible);
                }}
              >
                <FilterIcon className="mr-4" color="#7C5DEE" size={16} />{" "}
                Filters
              </li>
              <li className="flex items-center p-2 text-miru-dark-purple-400">
                <PaperPlaneTiltIcon className="mr-4" size={16} /> Share
              </li>
            </MobileMoreOptions>
          )}
        </div>
        {showExportButon && isDesktop && (
          <div className="mt-10 inline-flex lg:mt-0">
            <div className="relative px-3">
              <button
                className="menuButton__button inline-flex justify-center rounded-md border border-miru-han-purple-1000 bg-white p-2 text-miru-han-purple-1000 hover:bg-gray-50"
                onClick={() => setShowExportOptions(!showExportOptions)}
              >
                <ShareIcon className="" size={20} weight="bold" />
                <p className="mx-2 text-base font-medium uppercase tracking-wider">
                  Export
                </p>
                <CaretDownIcon size={20} weight="bold" />
              </button>
              {showExportOptions && (
                <ul className="menuButton__wrapper">
                  <li>
                    <button
                      className="menuButton__list-item"
                      onClick={() => {
                        setShowExportOptions(false);
                        handleDownload("csv");
                      }}
                    >
                      <FileCsvIcon color="#5B34EA" size={16} weight="bold" />
                      <span className="ml-3">Export as CSV</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="menuButton__list-item"
                      onClick={() => {
                        setShowExportOptions(false);
                        handleDownload("pdf");
                      }}
                    >
                      <FilePdfIcon color="#5B34EA" size={16} weight="bold" />
                      <span className="ml-3">Export as PDF</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="menuButton__list-item"
                      onClick={() => window.print()}
                    >
                      <PrinterIcon color="#5B34EA" size={16} weight="bold" />
                      <span className="ml-3">Print</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
            <div>
              <button className="inline-flex justify-center rounded-md border border-miru-han-purple-1000 bg-white p-2 text-miru-han-purple-1000 hover:bg-gray-50">
                <PaperPlaneTiltIcon size={20} weight="bold" />
                <p className="mx-2 text-base font-medium uppercase tracking-wider">
                  Share
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {showNavFilters && (
          <ul className="flex flex-wrap">
            <NavigationFilter />
            {selectedReport.filterCounter > 0 && (
              <li className="mr-4 flex px-2 py-1 px-1 " key="clear_all">
                <button
                  className="ml-1 inline-block flex items-center"
                  onClick={resetFilter}
                >
                  <XIcon
                    className="inline-block"
                    color="#5B34EA"
                    size={12}
                    weight="bold"
                  />
                  <span className="ml-1 whitespace-nowrap text-xs font-bold tracking-widest text-miru-han-purple-1000">
                    CLEAR ALL
                  </span>
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
