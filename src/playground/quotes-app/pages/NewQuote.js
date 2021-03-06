import {useEffect} from "react";
import { useHistory } from 'react-router-dom'

import QuoteForm from "./../components/quotes/QuoteForm";
import useHttp from "./../hooks/use-http";
import {addQuote } from "./../lib/api";

const NewQuote = (props) => {

  const history = useHistory();

  const {sendRequest, status} = useHttp(addQuote);

  useEffect(() => {
    if(status === "completed" ){
      history.push('/quotes')
    }
  }, [history, status])

  const addNewQuoteHandler = (newQuotes) => {
    sendRequest(newQuotes)
  };

  return (
    <div>
      <h1>New quote</h1>
      <QuoteForm isLoading={status === "pending"} onAddQuote={addNewQuoteHandler} />
    </div>
  );
};

export default NewQuote;
