import React from 'react'

// export default class Contacts extends React.Component {
//   render() {
//     return <div>
//       {/* <!-- Intro Full Width Slider --> */}
//       <section class="master-slider fw-slider content-slider ms-skin-default space-bottom" id="intro-slider">
//         <div class="ms-slide" style={{"background-image": "url(img/intro/slider/bg.jpg)"}}>
//           <div class="container padding-top-3x padding-bottom-3x">
//             <div class="row padding-top-3x padding-bottom-2x">
//               <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 text-center">
//                 <h1 class="text-light">Advanced Multi-Purpose Technology Template</h1>
//                 <h4 class="text-light text-thin">Nucleus incorporates both great presentational landing pages and components for building full-featured website.</h4>
//                 <div class="padding-top">
//                   <a href="#" class="btn btn-primary waves-effect waves-light">Purchase Now</a>
//                   <a href="#demos" class="btn btn-ghost btn-light waves-effect scroll-to" data-offset-top="55">View Demos</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>{/*<!-- .ms-slide -->*/}
//       </section>{/*<!-- .master-slider.ms-skin-default -->*/}
//     </div>
//   }
// }

var Carousel = require('nuka-carousel');

const App = React.createClass({
  mixins: [Carousel.ControllerMixin],

  disableDragging(e){
    e.preventDefault();
    return false;
  },

  render() {
    self = this;
    return (
      <div>
      </div>
    )
  }
});

module.exports = App;
