import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createRoom, typing, incrementCount,
  decrementCount, destroyRoom, fetchRooms } from '../actions/rooms';
import ListRooms from '../components/ListRooms';
import EntryBox from '../components/EntryBox'

class DashBoardItem extends React.Component {
  render() {
    return <div className="grid-item apps">
        <a href="#" className="portfolio-item">
          <div className="thumbnail waves-effect waves-light">
            <img src={this.props.image} alt={this.props.title}/>
          </div>
          <h3 className="portfolio-title">{this.props.title}</h3>
        </a>
      </div>;
  }
}


class DashBoard extends React.Component{


  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRender() method
  static need = [  // eslint-disable-line
    fetchRooms
  ];

  constructor(props){
    super(props);
    this.state = {
      dashboards: [],
      pollInterval: 2000
    }
  }


  render() {
    // const token = auth.getToken();
    const token = "Our latest works";

    const {newRoom, rooms, typing, createRoom, destroyRoom, incrementCount, decrementCount } = this.props;

    return (
      <div>
        {/*<!-- Content --> */}
        <section className="container">
          <h2 className="block-title text-center">
            Dashboard
            <small>{token}</small>
          </h2>
          <EntryBox room={newRoom}
                    onEntryChange={typing}
                    onEntrySave={createRoom} />

          <ListRooms rooms={rooms}
                       onIncrement={incrementCount}
                       onDecrement={decrementCount}
                       onDestroy={destroyRoom} />


          {/*<!-- Filters --> */}
          <div className="text-center padding-top">
            <ul className="nav-filters space-bottom-2x text-center">
              <li className="active"><a href="#" data-filter="*">Show All</a></li>
              <li><a href="#" data-filter=".apps">Recent</a></li>
              <li><a href="#" data-filter=".identity">Art Room</a></li>
            </ul>{/*<!-- .nav-filters --> */}
          </div>

          {/*<!-- Portfolio Grid --> */}
          <div className="grid isotope-grid col-3 filter-grid">
            <div className="grid-sizer"></div>
            <div className="gutter-sizer"></div>

            <DashBoardItem image="img/portfolio/01.jpg" title="CommCell 1" />
            <DashBoardItem image="img/portfolio/02.jpg" title="CommCell 2" />
            <DashBoardItem image="img/portfolio/03.jpg" title="CommCell 3" />
            <DashBoardItem image="img/portfolio/04.jpg" title="CommCell 4" />
            <DashBoardItem image="img/portfolio/05.jpg" title="CommCell 5" />
            <DashBoardItem image="img/portfolio/06.jpg" title="CommCell 6" />

          </div>{/*<!-- .isotope-masonry-grid --> */}

          {/*<!-- Load More Button --> */}
          <div className="text-center padding-top">
            <a href="#" className="btn btn-default btn-ghost waves-effect">Load More</a>
          </div>
        </section>{/*<!-- .container --> */}

        {/*<!-- Scroll To Top Button --> */}
        <a href="#" className="scroll-to-top-btn">
          <i className="icon-arrow-up"></i>
        </a>{/*<!-- .scroll-to-top-btn --> */}
      </div>
    )
  }
}

DashBoard.propTypes = {
  rooms: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  destroyRoom: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  newRoom: PropTypes.string
};

function mapStateToProps(state) {
  return {
    rooms: state.room.rooms,
    newRoom: state.room.newRoom
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createRoom, typing, incrementCount, decrementCount, destroyRoom })(DashBoard);


/*

 Note to self, ideally we wil want to retrieve a list of dashboard items and pass them onto components,
 something along these lines

 ** A key is required for generating dom from loops**

 createListItem: function(user) {
 return (
 <li key={user.id}>
 <Link to="{'/users/' + user.id}">{user.name}</Link>
 </li>
 );
 }
 });

 class DashBoardList extends React.Component{
 render: function() {
 return (
 <ul className="user-list">
 {this.props.users.map(this.createListItem)}
 </ul>
 );
 }
 };

 */
