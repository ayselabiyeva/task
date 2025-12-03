// test/pagination.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '@/app/components/Pagination';

describe('Pagination Component', () => {
  it('should render pagination with current page and total pages', () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should disable Previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    
    const prevButton = screen.getByText('Previous').closest('a');
    expect(prevButton).toHaveClass('pointer-events-none');
  });

  it('should disable Next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    
    const nextButton = screen.getByText('Next').closest('a');
    expect(nextButton).toHaveClass('pointer-events-none');
  });

  it('should highlight current page', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    
    const currentPageButton = screen.getByText('3').closest('a');
    expect(currentPageButton).toHaveClass('bg-amber-600');
  });
});