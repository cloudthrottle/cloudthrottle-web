import {useDispatch} from "react-redux";
import React, {FormEvent} from "react";
import {userClearLocalStorage} from "../../states/actions/stores";

export const ClearLocalStorageForm = () => {
  const dispatch = useDispatch()

  const handleClearLocalStorage = (event: FormEvent) => {
    event.preventDefault()

    dispatch(userClearLocalStorage())
  }

  return (
    <form action="/stores/clear" method="post" onSubmit={handleClearLocalStorage}>
      <button type="submit">Clear Storage</button>
    </form>
  );
};
