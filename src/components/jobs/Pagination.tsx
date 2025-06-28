import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({ currentPage, setCurrentPage, totalCount, itemsPerPage, fetchItems, pageNumberToShow, children }) {

    const url = new URL(window.location.href);


    let total = []

    if (totalCount > 0) new Array(Math.ceil(totalCount / itemsPerPage)).fill(1).forEach((arr, index) => total.push({ number: index + 1 }))

    const onButtonClick = async (pgNumber) => {
        setCurrentPage(pgNumber)
        url.searchParams.set("page", pgNumber);
        window.history.replaceState(null, null, url)
        await fetchItems(pgNumber)
    }

    const NextPreviousButton = async (name) => {
        let wantedPage = name === "next" ? currentPage + 1 : currentPage - 1
        url.searchParams.set("page", wantedPage);
        window.history.replaceState(null, null, url)
        setCurrentPage(wantedPage)
        await fetchItems(wantedPage)
    }

    return (
        <div className="flex flex-col justify-between">
            <div className="w-full p-0">
                {children}
            </div>
            <div className='flex justify-center items-center mt-3 gap-3 '>
                <div className="text-center">
                    {total?.length > 1 && currentPage !== 1 && <button type="button" onClick={() => NextPreviousButton("previous")} className="btn btn-xs rounded"><IoIosArrowBack size={"20px"} /> </button>}
                </div>
                <div className="d-flex rounded  justify-content-center gap-3">
                    {total && total.length > 1 && total.map((page, index) => {
                        if (page.number <= currentPage + pageNumberToShow && page.number >= currentPage - pageNumberToShow || page.number === currentPage) {
                            return (
                                <div>
                                    <button type='button' key={index} onClick={() => { onButtonClick(page.number) }} className={`btn btn-xs rounded-circle ${currentPage === page.number ? "btn-dark" : "btn-outline-dark"} `}>{page.number}</button>
                                </div>
                            )
                        }

                    })}
                </div>
                <div className=" text-center">
                    {total?.length > 1 && currentPage !== total.length && <button type="button" onClick={() => NextPreviousButton("next")} className="btn btn-xs rounded"><IoIosArrowForward size={"20px"} /></button>}
                </div>
            </div>
        </div>
    )

}

export default Pagination;