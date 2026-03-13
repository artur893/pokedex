import { Button, IconButton } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";

function Pagination({ totalItems, itemsOnPage, activePage, setPage }) {
  const range = window.innerWidth < 426 ? 1 : window.innerWidth < 769 ? 2 : 3;

  const totalPages = Math.ceil(totalItems / itemsOnPage);
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
    <div className="flex items-center gap-1 self-center mt-4">
      {activePage !== 1 && (
        <Button isPill variant="ghost" onClick={() => setPage(activePage - 1)}>
          <NavArrowLeft className="mr-1.5 h-4 w-4 stroke-2" />
          Previous
        </Button>
      )}
      {populateButtons()}
      {activePage !== totalPages && (
        <Button isPill variant="ghost" onClick={() => setPage(activePage + 1)}>
          Next
          <NavArrowRight className="ml-1.5 h-4 w-4 stroke-2" />
        </Button>
      )}
    </div>
  );
}

export default Pagination;
