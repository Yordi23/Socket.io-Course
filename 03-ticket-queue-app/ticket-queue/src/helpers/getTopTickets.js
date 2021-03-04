export const getTopTickets = async () => {
    const res = await fetch('http://localhost:8080/tickets/top');
    const data = await res.json();

    return data;
}