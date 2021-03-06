import { Fragment, useState, useEffect } from "react";
import { Prompt } from "react-router-dom";

import { useRef } from "react";
import { useHistory } from "react-router-dom";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEnteredForm, setIsEnteredForm] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const history = useHistory();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    history.push("/quotes");
    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
  const focusEnteredForm = () => {
    setIsEnteredForm(true);
  };

  const historyPromptHandler = () => {
    setIsEnteredForm(false);
  };

  useEffect(() => {
    console.log("Focus");
  }, [isEnteredForm]);

  return (
    <Fragment>
      <Prompt when={isEnteredForm} message={() => "Quer sair caralho?"} />
      <Card>
        <form
          onFocus={focusEnteredForm}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={historyPromptHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
