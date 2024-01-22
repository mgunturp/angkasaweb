"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import RangeSlider from "./rangeprice"
const url = "https://easy-lime-seal-toga.cyclic.app";

function Rute({ searchParams }) {

  const [expanded, setExpanded] = useState(true);
  const [filterTransit, setFilterTransit] = useState(false);
  const [filterFacilities, setFilterFacilities] = useState(false);
  const [filterDeparture, setFilterDeparture] = useState(false);
  const [filterArrived, setFilterArrived] = useState(false);
  const [filterAirlines, setFilterAirlines] = useState(false);
  const [filterTicket, setFilterTicket] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [dataAllFlights, setDataAllFlights] = useState();
  const [departureCity, setDepartureCity] = useState();
  const [destinationCity, setDestinationCity] = useState();
  const [filteredFlightByTransitDirect, setFilteredFlightByTransitDirect] = useState(false);
  const [filteredFlightByTransitOne, setFilteredFlightByTransitOne] = useState(false);
  const [filteredFlightByTransitMuch, setFilteredFlightByTransitMuch] = useState(false);
  const [filterByFacilities, setFilterByFacilities] = useState([]);
  const [filterByAirlines, setFilterByAirlines] = useState([]);
  const [dataPaginations, setDataPaginations] = useState();

  const { format } = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    getAllFlight();

  }, [filterByFacilities, filterByAirlines, minPrice, maxPrice]);

  const getAllFlight = async () => {
    const baseUrl = url + `/airlines/flight?facilities=${filterByFacilities}&airlineId=${filterByAirlines}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const url2 = url + `/airlines/flight-all`;
    try {
      const res = await axios.get(baseUrl);
      setDataAllFlights(res.data.data);
      setDataPaginations(res.data.data.slice(start, end));
    } catch (error) {
      console.log(error.message);
    }
  };

  
  const handleChangeFilterByFacilities = (e) => {
    const { value, checked } = e.target;
    checked ? setFilterByFacilities((facilities) => [...facilities, value]) : setFilterByFacilities((facilities) => [...facilities.filter((idFacilities) => idFacilities !== value)]);
  };
  const handleChangeFilterByAirlines = (e) => {
    const { value, checked } = e.target;
    checked ? setFilterByAirlines((airlines) => [...airlines, value]) : setFilterByAirlines((airlines) => [...airlines.filter((idAirlines) => idAirlines !== value)]);
  };

  // get unique departure city
  const fromCity = dataAllFlights?.map((items) => items.from.location);
  const uniqueFromcity = Array.from(new Set(fromCity));

  // get unique destination city
  const toCity = dataAllFlights?.map((items) => items.to.location);
  const uniqueTocity = Array.from(new Set(toCity));

  const getMinPrice = (minValue) => {
    setMinPrice(minValue);
  };

  const getMaxPrice = (maxValue) => {
    setMaxPrice(maxValue);
  };

  const getFormattedTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const handleDropdownClick = (flight) => {
    setSelectedFlight(selectedFlight === flight ? null : flight);
  };

  const changeDepartureCity = (value) => {
    setDepartureCity(value);
  };

  const changeDestinationCity = (value) => {
    setDestinationCity(value);
  };
  const changeSearch = () => {
    const result = dataAllFlights?.filter((items) => {
      return items.from.location === departureCity && items.to.location === destinationCity;
    });
    setDataAllFlights(result);
    setFilteredFlightByTransitDirect(false);

    setFilteredFlightByTransitOne(false);
    setFilteredFlightByTransitMuch(false);
  };
  const handleResetFilter = () => {
    window.location.reload(false);
  };

  return (
    <>
      <div className="w-full bg-[#2395FF] h-[200px] relative rounded-b-[30px] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="217" height="172" viewBox="0 0 217 172" fill="none" className="absolute bottom-0 -z-10">
          <path
            d="M20.3188 166.013C22.5266 169.675 25.6273 171.752 28.8722 171.746L74.7643 171.65C78.386 171.642 81.9556 170.337 85.1844 167.838L187.473 88.8008C196.874 81.5367 205.3 71.1679 211.034 57.5872C217.471 42.3417 218.171 31.3091 215.629 23.5151C213.094 15.7157 206.932 9.98796 195.151 8.821C184.657 7.78251 174.219 11.99 164.819 19.2487L130.187 46.0086L53.3018 2.08152C52.3774 1.13327 51.3034 0.578218 50.1909 0.473756C49.0784 0.369293 47.9677 0.719211 46.9738 1.48733L23.859 19.3504C20.1079 22.2464 19.2009 29.8692 22.0414 34.6227L76.9615 87.136L40.6774 115.175L15.2424 95.6527C14.3661 94.98 13.3981 94.6304 12.4168 94.6323C11.4354 94.6341 10.4681 94.9873 9.59285 95.6634L-4.51508 106.568C-8.18533 109.405 -9.1521 116.803 -6.47325 121.599L20.3188 166.013Z"
            fill="#41A4FF"
          />
        </svg>
        <div className="rute flex justify-center items-center pt-16 gap-10 ">
          <div className="flex justify-center items-center gap-10">
            <Image src="/vector-2.svg" width={50} height={50}></Image>
            <div className="wrapper-detail">
              <div className="detail flex items-center justify-center gap-10">
                <div className="from">
                  <p className="text-[12px] text-white mb-2">From</p>
                  <select value={departureCity} className="text-[16px] text-white bg-transparent font-semibold mt-1 outline-none focus:outline-none" onChange={(e) => changeDepartureCity(e.target.value)}>
                    {uniqueFromcity?.map((items, index) => {
                      return (
                        <option value={items} key={index + 1} className="text-black">
                          {items}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="icon mt-6">
                  <Image src="/vector-white.svg" width={20} height={20}></Image>
                </div>
                <div className="to">
                  <p className="text-[12px] text-white mb-2">To</p>
                  <select value={destinationCity} className="md:text-[16px] text-white bg-transparent font-semibold mt-1 outline-none focus:outline-none" onChange={(e) => changeDestinationCity(e.target.value)}>
                    {uniqueTocity?.map((items, index) => {
                      return (
                        <option value={items} key={index + 1} className="text-black">
                          {items}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button className="text-white text-[16px] font-semibold z-10">
                  Change Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1366px] flex mx-auto pt-8 bg-[#F5F6FA]">
        <div className="flex flex-col w-[30%]">
          <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-[#000] text-[16px] md:text-[24px] font-semibold" onClick={() => setExpanded((curr) => !curr)}>
              Filter
            </h1>
            <h1 className="text-blue text-[12px] md:text-[16px] font-semibold cursor-pointer " onClick={handleResetFilter}>
              Reset
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-y-2 w-[70%] justify-between items-center pe-4 sm:pe-6 lg:pe-8">
          <h1 className="text-[#000] text-[16px] md:text-[24px] font-semibold">
            Select Ticket <span className="text-secondary text-[12px] md:text-[16px] font-semibold">({dataAllFlights?.length} flights found)</span>
          </h1>
          <div className="flex gap-x-2">
            <h1 className="text-[#000] text-[12px] md:text-[16px] font-semibold">Sort by</h1>
            <img src="/transfer.svg" alt="sort" />
          </div>
        </div>
      </div>
      <div className="max-w-[1366px] flex mx-auto pb-[25px] px-4 sm:px-6 lg:px-8 pt-7 bg-[#F5F6FA] gap-x-9">
        <div className={`md:w-[27%] w-[200px] h-full md:relative absolute rounded-[15px] p-4 bg-[#fff] ${expanded ? null : "hidden"}`}>
          <div className="border-b border-[#E5E5E5] mb-5">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[#000] text-[16px] font-semibold">Transit</h1>
              <img src={`${filterTransit ? "/ar-up.svg" : "/btnback.svg"}`} onClick={() => setFilterTransit(!filterTransit)} alt="arrow" className="cursor-pointer" />
            </div>
            <div className={`${filterTransit ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Direct</h1>
              <input type="checkbox" checked={filteredFlightByTransitDirect ? true : false} onChange={() => setFilteredFlightByTransitDirect(!filteredFlightByTransitDirect)} />
            </div>
            <div className={`${filterTransit ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Transit</h1>
              <input type="checkbox" checked={filteredFlightByTransitOne ? true : false} onChange={() => setFilteredFlightByTransitOne(!filteredFlightByTransitOne)} />
            </div>
            <div className={`${filterTransit ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Transit 2+</h1>
              <input type="checkbox" checked={filteredFlightByTransitMuch ? true : false} onChange={() => setFilteredFlightByTransitMuch(!filteredFlightByTransitMuch)} />
            </div>
          </div>
          <div className="border-b border-[#E5E5E5] mb-5">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[#000] text-[16px] font-semibold">Facilities</h1>
              <img src={`${filterFacilities ? "/ar-up.svg" : "/btnback.svg"}`} onClick={() => setFilterFacilities(!filterFacilities)} alt="arrow" className="cursor-pointer" />
            </div>
            <div className={`${filterFacilities ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Luggage</h1>
              <input type="checkbox" value={"1"} onChange={handleChangeFilterByFacilities} />
            </div>
            <div className={`${filterFacilities ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">In-Flight Meal</h1>
              <input type="checkbox" value={"2"} onChange={handleChangeFilterByFacilities} />
            </div>
            <div className={`${filterFacilities ? "flex" : "hidden"} justify-between items-center mb-5`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Wi-fi</h1>
              <input type="checkbox" value={"3"} onChange={handleChangeFilterByFacilities} />
            </div>
          </div>
          <div className="border-b border-[#E5E5E5] mb-5">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[#000] text-[16px] font-semibold">Departure Time</h1>
              <img src={`${filterDeparture ? "/ar-up.svg" : "/btnback.svg"}`} onClick={() => setFilterDeparture(!filterDeparture)} alt="arrow" className="cursor-pointer" />
            </div>
            <div className={`${filterDeparture ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">00:00 - 06:00</h1>
              <input type="checkbox" />
            </div>
            <div className={`${filterDeparture ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">06:00 - 12:00</h1>
              <input type="checkbox" />
            </div>
            <div className={`${filterDeparture ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">12:00 - 18:00</h1>
              <input type="checkbox" />
            </div>
            <div className={`${filterDeparture ? "flex" : "hidden"} justify-between items-center mb-5`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">18:00 - 24:00</h1>
              <input type="checkbox" />
            </div>
          </div>
          <div className="border-b border-[#E5E5E5] mb-5">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[#000] text-[16px] font-semibold">Time Arrived</h1>
              <img src={`${filterArrived ? "/ar-up.svg" : "/btnback.svg"}`} onClick={() => setFilterArrived(!filterArrived)} alt="arrow" className="cursor-pointer" />
            </div>
            <div className={`${filterArrived ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">00:00 - 06:00</h1>
              <input type="checkbox" />
            </div>
            <div className={`${filterArrived ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">06:00 - 12:00</h1>
              <input type="checkbox" />
            </div>
            <div className={`${filterArrived ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">12:00 - 18:00</h1>
              <input type="checkbox" />
            </div>
            <div className={`${filterArrived ? "flex" : "hidden"} justify-between items-center mb-5`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">18:00 - 24:00</h1>
              <input type="checkbox" />
            </div>
          </div>
          <div className="border-b border-[#E5E5E5] mb-5">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[#000] text-[16px] font-semibold">Airlines</h1>
              <img src={`${filterAirlines ? "/ar-up.svg" : "/btnback.svg"}`} onClick={() => setFilterAirlines(!filterAirlines)} alt="arrow" className="cursor-pointer" />
            </div>
            <div className={`${filterAirlines ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Garuda Indonesia</h1>
              <input type="checkbox" value={"2"} onChange={handleChangeFilterByAirlines} />
            </div>
            <div className={`${filterAirlines ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Air Asia</h1>
              <input type="checkbox" value={"4"} onChange={handleChangeFilterByAirlines} />
            </div>
            <div className={`${filterAirlines ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Lion Air</h1>
              <input type="checkbox" value={"3"} onChange={handleChangeFilterByAirlines} />
            </div>
            <div className={`${filterAirlines ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Singapore Airlines</h1>
              <input type="checkbox" value={"1"} onChange={handleChangeFilterByAirlines} />
            </div>
            <div className={`${filterAirlines ? "flex" : "hidden"} justify-between items-center mb-5`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Citilink</h1>
              <input type="checkbox" value={"5"} onChange={handleChangeFilterByAirlines} />
            </div>
          </div>
          <div className="mb-5 border-[#E5E5E5] border-b">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[#000] text-[16px] font-semibold">Ticket Price</h1>
              <img src={`${filterTicket ? "/ar-up.svg" : "/btnback.svg"}`} onClick={() => setFilterTicket(!filterTicket)} alt="arrow" className="cursor-pointer" />
            </div>
            <div className={`${filterTicket ? "flex" : "hidden"} justify-between items-center mb-7`}>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Lowest</h1>
              <h1 className="text-[#000] text-[14px] font-normal leading-5">Higest</h1>
            </div>
            <div className={`${filterTicket ? "flex" : "hidden"} justify-between items-center mb-3`}>
              <RangeSlider initialMin={0} initialMax={1000} min={0} max={1000} step={100} priceCap={100} getMinPrice={getMinPrice} getMaxPrice={getMaxPrice} />
            </div>
            <div className={`${filterTicket ? "flex" : "hidden"} justify-between items-center mb-5`}>
              <h1 className="text-[16px] font-semibold text-blue">{format(minPrice)}</h1>
              <h1 className="text-[16px] font-semibold text-blue">{format(maxPrice)}</h1>
            </div>
          </div>
        </div>
        <div className={`w-[100%] md:w-[73%] flex flex-col`}>
          {dataAllFlights?.map((flight) => {
            return (
              <div className="bg-white  w-[878px] h-auto relative  px-8 py-4 rounded-lg shadow-md mb-6 mt-5" key={flight.code}>
                <div className="logo flex items-center gap-6">
                  <img src={flight.photo} alt={flight.name} width={150} height={150} />
                  <p className="text-[16px] font-[500] text-[#595959]">{flight.name}</p>
                </div>
                <div className="wrapper-detail flex items-center justify-between pt-4">
                  <div className="flight flex items-center gap-6 ">
                    <div className="from flex flex-col items-center">
                      <h1 className="text-[24px] font-[500]">
                        {flight.from.country === "Indonesia"
                          ? "IDN"
                          : flight.from.country === "France"
                          ? "FRA"
                          : flight.from.country === "United States"
                          ? "USA"
                          : flight.from.country === "United Kingdom"
                          ? "UK"
                          : flight.from.country === "Australia"
                          ? "AUS"
                          : flight.from.country}
                      </h1>
                      <p className="text-[12px]">{getFormattedTime(flight.takeoff)}</p>
                    </div>
                    <div className="logo mb-3">
                      <Image src="/to.svg" alt="icon plane" width={19.032} height={18}></Image>
                    </div>
                    <div className="to flex flex-col items-center">
                      <h1 className="text-[24px] font-[500]">
                        {flight.to.country === "Indonesia"
                          ? "IDN"
                          : flight.to.country === "France"
                          ? "FRA"
                          : flight.to.country === "United States"
                          ? "USA"
                          : flight.to.country === "United Kingdom"
                          ? "UK"
                          : flight.to.country === "Australia"
                          ? "AUS"
                          : flight.to.country === "Japan"
                          ? "JPN"
                          : flight.to.country === "Singapore"
                          ? "SGP"
                          : flight.to.country === "Malaysia"
                          ? "MYS"
                          : flight.to.country}
                      </h1>
                      <p className="text-[12px]">{getFormattedTime(flight.landing)}</p>
                    </div>
                  </div>
                  <div className="hours">
                    <p className="text-[16px] text-[#595959]">{flight.interval_time}</p>
                    <p className="text-[12px] text-[#6B6B6B] text-center"> ({flight.transit === 0 ? "Direct" : `${flight.transit} Transit Points`})</p>
                  </div>
                  <div className="facilities flex items-center gap-3">
                    {flight.facilities.map((facility, index) => (
                      <span key={index}>
                        <Image src={`/${facility}.svg`} alt={facility} width={26} height={26} />
                      </span>
                    ))}
                  </div>
                  <div className="price text-[16px] font-[500]">
                    <p className="text-[#2395FF]">
                      <span className="mr-2">$</span>
                      {flight.price},00
                      <span className="ml-2 text-[#979797] text-[14px]">/pax</span>
                    </p>
                  </div>
                  <div className="btn">
                    <Link href={`/form-ticket?code=${flight.code}`}>
                      <button className="w-[150px] bg-[#2395FF] py-2 text-white rounded-[10px] shadow-sm shadow-[#2395FF] transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring focus:border-blue-300">
                        Select
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="detail">
                  <button onClick={() => handleDropdownClick(flight)} className="pt-8 text-[16px] text-[#2395FF] font-[600]">
                    {selectedFlight === flight ? "Hide Details" : "View Details"}
                  </button>
                  {selectedFlight === flight && (
                    <div className="pb-10 mt-3 flex items-center justify-between px-20 bg-slate-200 py-4 rounded-md">
                      <div className="form mt-3">
                        <h1>From</h1>
                        <div className="bandara mt-3 flex items-center gap-3">
                          <Image src="/plane.png" alt="plane icon" width={25} height={25}></Image>
                          <p className="font-[600]">{flight.from.name}</p>
                        </div>
                        <div className="terminal ml-9">
                          <p className="text-[12px]">Terminal : {flight.to.terminal}</p>
                        </div>
                        <div className="location flex items-center gap-3  pt-2">
                          <Image src="/map-pin.svg" alt="plane icon" width={15} height={15}></Image>
                          <p className="text-[14px]">{flight.from.location}</p>
                        </div>
                      </div>
                      <div className="form mt-3">
                        <h1>To</h1>
                        <div className="bandara mt-3 flex items-center gap-3">
                          <Image src="/plane.png" alt="plane icon" width={25} height={25}></Image>
                          <p className="font-[600]">{flight.to.name}</p>
                        </div>
                        <div className="terminal ml-9">
                          <p className="text-[12px]">Terminal : {flight.from.terminal}</p>
                        </div>
                        <div className="location flex items-center gap-3 pt-2">
                          <Image src="/map-pin.svg" alt="plane icon" width={15} height={15}></Image>
                          <p className="text-[14px]">{flight.to.location}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Rute;
