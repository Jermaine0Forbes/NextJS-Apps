import { getQuotes } from "@/actions/quote"
import QuoteList from "./quote-list"

export default function QuotesPage()
{
    // const data = (async () => ( await getQuotes()))()

    return(<>
    <h1>Quotes</h1>
        <QuoteList/>
    </>)
}