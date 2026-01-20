import Icon from './icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev
}: PaginationProps) {
  return (
    <div className="pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        aria-label="Pagina anterior"
        className="ghost-button"
      >
        <Icon name="prev" />
        Anterior
      </button>
      <span>
        Pagina {currentPage} de {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        aria-label="Pagina siguiente"
        className="ghost-button"
      >
        Siguiente
        <Icon name="next" />
      </button>
    </div>
  );
}
