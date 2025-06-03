import "./MainScreen.css";

export function MainScreen() {
  return (
    <div className="main-screen">
      <div className="container pt-5 main-content">
        <div className="w-50 d-flex flex-column justify-content-start">
          <h1>STONKS TRADING</h1>
          <p className="fs-2 mt-3">Самая популярная криптанская биржа на рынке, позволит вам удобно заниматься криптанскими делами 24/7</p>
        </div>
        <button className="btn btn-success btn-lg buy-btn">Слышь, купи</button>
      </div>
    </div>
  );
}
