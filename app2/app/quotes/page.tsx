import { getQuotes } from "@/actions/quote"

export default function QuotesPage()
{
    const data = (async () => ( await getQuotes()))()

    return(<>
    <h1>Quotes</h1>

    </>)
}