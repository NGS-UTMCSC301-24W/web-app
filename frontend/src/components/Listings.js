import React from 'react';


const Listings = () => {
    return (
        <div>
            {/* Nav Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">

                    <a className="navbar-brand p-4" href="javascript:void(0)">Uhome</a>

                    <form className="d-flex align-items-center">
                        <input className="form-control me-2" type="text" placeholder="Search" />
                        <button className="btn btn-primary btn-sm" type="button">Search</button>
                    </form>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse justify-content-end" id="mynavbar">
                        <ul className="navbar-nav me-5">
                            <li className="nav-item m-2">
                                {/* Sign in/Already Signed In */}
                                <a className="nav-link" href="javascript:void(0)"><button className="btn btn-primary mt-2">My Account</button></a>
                            </li>
                            <li className="nav-item m-2">
                                {/* Ask me chat  */}
                                <a className="nav-link" href="javascript:void(0)"><button className="btn btn-primary mt-2">Ask</button></a>
                            </li>
                            <li class="nav-item m-2">
                                {/* Needed links for rental information*/}
                                <a class="nav-link" href="javascript:void(0)"><button class="btn btn-primary mt-2">Rental Information</button></a>
                            </li>
                            <li class="nav-item m-2">
                                {/* Page that has all of users' favourites */}
                                <a class="nav-link" href="javascript:void(0)"><button class="btn btn-primary mt-2">Favourites</button></a>
                            </li>
                            <li class="nav-item m-2">
                                {/* Needed links for rental information */}
                                <a class="nav-link" href="javascript:void(0)"><button class="btn btn-primary mt-2">UTM</button></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Lisitings as Cards */}
            <div className="container mt-4">
                <div className="row">

                    <div className="col-lg-3 col-md-4 col-sm-12 mt-2">
                        <div className="card">
                            <img className="card-img-top" src="" alt="Card image" />
                            <div className="card-body">
                                <h4 className="card-title">Listing #1</h4>
                                <p className="card-text">Lorem ipsum</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #2</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #3</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #4</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #5</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #6</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #7</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #8</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #9</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #10</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #11</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="" alt="Card image"/>
                        <div class="card-body">
                            <h4 class="card-title">Lisiting #12</h4>
                            <p class="card-text">Lorem ipsum</p>
                        </div>
                    </div> 
                </div>
                    
                </div>
            </div>

            {/* Spotlight Talk about Uhome */}
            <div className="container mt-5">
                <div className="text-wrap py-4 px-4">
                    <h3>Uhome</h3>
                    <h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet commodo nulla facilisi nullam vehicula ipsum. Id volutpat lacus laoreet non curabitur gravida. Viverra adipiscing at in tellus integer feugiat scelerisque. Nam at lectus urna duis. Sit amet justo donec enim diam vulputate ut pharetra. Urna nunc id cursus metus aliquam eleifend mi. Pharetra magna ac placerat vestibulum lectus. Elementum integer enim neque volutpat ac. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Gravida neque convallis a cras semper auctor neque. Nec sagittis aliquam malesuada bibendum arcu. Augue ut lectus arcu bibendum at varius vel. Pharetra vel turpis nunc eget. Commodo quis imperdiet massa tincidunt. Volutpat blandit aliquam etiam erat velit scelerisque in dictum. Venenatis cras sed felis eget.
                    </h4>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-5 bg-primary">
                
                <div className="container row px-4 py-4">
                    <section className="col-md-6 col-sm-12 px-2">
                        <h5>Privacy&Terms</h5>
                    </section>
                    <section className="col-md-6 col-sm-12 px-2">
                        <h5>Contact</h5>
                    </section>
                </div>
                {/* socials */}
                <div className="mt-2 bg-utm-dark-blue container-fluid py-3">
                    <section className="align-content-center text-center py-2">
                        <h4>Follow Uhome</h4>
                        <ul class="list-unstyled">
                            <li class="list-inline-item">Instagram</li>
                            <li class="list-inline-item">Twitter</li>
                            <li class="list-inline-item">YouTube</li>
                            <li class="list-inline-item">More Social Media</li>
                        </ul>
                    </section>
                </div>
            </footer>
        </div>
    );
}

export default Listings;
