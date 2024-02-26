"use client";
const AddFav = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNObUpJa2ZxbnJKc1lzWVAwY2NzIiwicm9sZXMiOlsiVVNFUiJdLCJzdGF0dXMiOiJDT01QTEVURUQiLCJpYXQiOjE3MDg4MDQyNDYsImV4cCI6MTcwOTQwOTA0Nn0.iuePXd3FVVZAHrW9LXWbUr2MGROwGPx8Jt645qihsFs";
  const addFavourite = async () => {
    const resp = await fetch(
      "http://127.0.0.1:5001/t-house-10/us-central1/api/favourites/addFavourite/0ZscKp8oswzBgWUtDAFI",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await resp.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={addFavourite}>add Fav</button>
    </div>
  );
};

export default AddFav;
