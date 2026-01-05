import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from "../components/SearchPage.jsx";
import '@testing-library/jest-dom';

// We wrap the component in BrowserRouter because SearchPage uses useNavigate
const renderComponent = () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );
};

describe('Ekanayake Estates - SearchPage Tests', () => {
  
  test('renders the main company title', () => {
    renderComponent();
    // We look for the Heading specifically to avoid the paragraph text
    const titleElement = screen.getByRole('heading', { name: /EKANAYAKE/i });
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the min and max bedroom numeric inputs', () => {
    renderComponent();
    const minBedInput = screen.getByLabelText(/Min Bed/i);
    const maxBedInput = screen.getByLabelText(/Max Bed/i);
    expect(minBedInput).toBeInTheDocument();
    expect(maxBedInput).toBeInTheDocument();
  });

  test('updates postcode state when user types', () => {
    renderComponent();
    const postcodeField = screen.getByLabelText(/Location/i);
    fireEvent.change(postcodeField, { target: { value: 'NW1' } });
    expect(postcodeField.value).toBe('NW1');
  });

  test('renders the shortlist sidebar area', () => {
    renderComponent();
    // Changed from "MY SHORTLIST" to "SHORTLIST" to match your code
    const sidebarTitle = screen.getByText(/SHORTLIST/i);
    expect(sidebarTitle).toBeInTheDocument();
  });

  test('displays instructions when shortlist is empty', () => {
    renderComponent();
    const emptyMessage = screen.getByText(/Drag properties here/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});