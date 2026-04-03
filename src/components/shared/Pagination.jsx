import { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";

function Pagination({ totalItems, itemsOnPage, activePage, setPage }) {
  const totalPages = Math.ceil(totalItems / itemsOnPage);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const range = viewportWidth < 426 ? 1 : viewportWidth < 769 ? 2 : 3;

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (activePage > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [activePage, setPage, totalItems, totalPages]);

  function populateButtons() {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i >= activePage - range && i <= activePage + range) {
        buttons.push(
          <IconButton
            key={i}
            isCircular
            variant={activePage === i ? "solid" : "ghost"}
            onClick={() => setPage(i)}
          >
            {i}
          </IconButton>,
        );
      }
    }
    return buttons;
  }

  return (
    <>
      {totalItems > 0 && (
        <div className="flex items-center gap-1 self-center mt-4">
          {activePage !== 1 && (
            <Button
              isPill
              variant="ghost"
              onClick={() => setPage(activePage - 1)}
            >
              <NavArrowLeft className="mr-1.5 h-4 w-4 stroke-2" />
              Prev
            </Button>
          )}
          {populateButtons()}
          {activePage !== totalPages && (
            <Button
              isPill
              variant="ghost"
              onClick={() => setPage(activePage + 1)}
            >
              Next
              <NavArrowRight className="ml-1.5 h-4 w-4 stroke-2" />
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default Pagination;
