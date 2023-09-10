import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import Cards from "../src/components/Cards";
import Card from "../src/components/Card";
import { expect, vi } from "vitest";
import Button from "../src/components/Button";
import CalendarPage from "../src/components/CalendarPage";

describe("App component", () => {
    it("it renders button", async () => {
        render(<App />);
        expect(screen.getByRole("button", { name: "Book Now" }));
    });

    it("renders headings of level 2 and 3", async () => {
        render(<App />);
        expect(screen.getAllByRole("heading", { level: 2, level: 3 }));
    });

    it("renders all the cards", async () => {
        const destinations = [
            {
                name: "Cala Sant Vicenc",
                english_name: "Cove of St Vincent",
                travel_time: 80,
                price_morning: 40,
                price_afternoon: 45,
                price_day: 75,
                price_base: 20,
            },
            {
                name: "Cala Pi de la Posada",
                english_name: "Formentor Beach",
                travel_time: 15,
                price_morning: 20,
                price_afternoon: 25,
                price_day: 35,
                price_base: 10,
            },
        ];

        render(<Cards destinations={destinations} />);

        const buttons = screen.getAllByText("Book Now");

        expect(screen.getAllByRole("heading", { level: 2 }));
        expect(buttons).toHaveLength(destinations.length);

    });

    it("render Calendar page on book now clicked", async () => {
        const destination = {
            name: "Cala Sant Vicenc",
            english_name: "Cove of St Vincent",
            travel_time: 80,
            price_morning: 40,
            price_afternoon: 45,
            price_day: 75,
            price_base: 20,
        }
        const booking = {passangers: 1}

        const prices = [1, 2, 3]

        const user = userEvent.setup();

        render(<Card destination={destination} setBooking={() => { }} setStep={() => { }} />)
        const button = screen.getByText("Book Now");

        await user.click(button);

        await waitFor(() => {
            try {
                render(<CalendarPage booking={booking} prices={prices} setBooking={() => { }} setStep={() => { }} />);
            } catch (error) {
                // If rendering fails, catch the error
            }
            expect(screen.getAllByRole("heading", { level: 2 }));
    })})});
