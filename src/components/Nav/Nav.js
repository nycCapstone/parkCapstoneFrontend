function Nav() {
  return (
    <>
      <div className="bg-body-tertiary">
        <div>
          <div href="#home">Brand link</div>
        </div>
      </div>
      <br />
      <div className="bg-body-tertiary">
        <div>
          <div>Brand text</div>
        </div>
      </div>
      <br />
      <div className="bg-body-tertiary">
        <div>
          <div href="/admin">
            <img
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Dashboard"
            />
          </div>
        </div>
      </div>
      <br />
      <div className="bg-body-tertiary">
        <div>
          <a href="/login">
            <img
              alt=""
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Login
          </a>
        </div>
      </div>
    </>
  );
}

export default Nav;