var React = require('react');

var NaviLink = require('../components/NaviLink.jsx');

var UrlConstants = require('../constants/UrlConstants.js');
//var Sticky = require('react-sticky');

var Home = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div className="padbotHome">

          <table className="timetable header">
            <tr className="borderless">
              <th colSpan="2">日常车次</th>
              <th className="weekday" colSpan="2">仅工作日</th>
              <th className="weekend" colSpan="2">仅周末</th>
              <th className="bigstop" colSpan="2">大站车</th>

            </tr>
          <tr>
            <th rowSpan="2">时间</th>
            <th colSpan="2">安亭4路</th>
            <th>北安跨线</th>
            <th colSpan="2">短驳车</th>
            <th>曹阳路高速车</th>
            <th colSpan="2">大润发</th>

          </tr>
          <tr>
            <th>出发</th>
            <th>返回</th>
            <th>出发</th>
            <th>出发</th>
            <th>返回</th>
            <th>出发</th>
            <th>出发</th>
            <th>返回</th>
          </tr>
          </table>

        <table className="timetable content">
          <tr>
            <td>6:00</td>
            <td></td>
            <td>6:46</td>
            <td>6:00<br/>6:40</td>
            <td>
              <span className="weekday">6:15</span><br/>
              <span className="weekday">6:30</span><br/>
              6:45
            </td>
            <td>
              <span className="weekday">6:30</span><br/>
              <span className="weekday">6:45</span>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>7:00</td>
            <td>7:35</td>
            <td>7:21<br/>7:56</td>
            <td>
              <span className="bigstop">7:00周六<br/>6:40</span></td>
            <td>7:00<br/>7:15<br/>7:30<br/>7:45</td>
            <td>7:00<br/>7:15<br/>7:30<br/>7:45</td>
            <td>7:20</td>
            <td>7:51</td>
            <td>7:15</td>
          </tr>
          <tr>
            <td>8:00</td>
            <td>8:10<br/>8:45</td>
            <td>8:31</td>
            <td>8:00</td>
            <td>8:00</td>
            <td>8:00<br/>8:15</td>
            <td></td>
            <td></td>
            <td>8:30</td>
          </tr>
          <tr>
            <td>9:00</td>
            <td>9:20<br/>9:55</td>
            <td>9:05<br/>9:41</td>
            <td>9:00</td>
            <td>
              <span className="weekday">9:00</span>

            </td>
            <td><span className="weekday">9:15</span></td>
            <td></td>
            <td>9:06</td>
            <td></td>
          </tr>
          <tr>
            <td>10:00</td>
            <td>10:30</td>
            <td>10:21</td>
            <td><span className="bigstop">10:00</span></td>
            <td>10:00</td>
            <td>10:15</td>
            <td>10:00</td>
            <td>10:36</td>
            <td>10:00</td>
          </tr>
          <tr>
            <td>11:00</td>
            <td>11:10<br/>11:50</td>
            <td>11:01<br/>11:41</td>
            <td>11:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>11:45</td>
          </tr>
          <tr>
            <td>12:00</td>
            <td>12:30</td>
            <td>12:21</td>
            <td>12:00</td>
            <td>12:00</td>
            <td>12:15</td>
            <td>12:30</td>
            <td>12:21</td>
            <td></td>
          </tr>
          <tr>
            <td>13:00</td>
            <td>13:10<br/>13:50</td>
            <td>13:01<br/>13:41</td>
            <td>13:00</td>
            <td>
              <span className="weekday">13:00</span>
            </td>
            <td><span className="weekday">13:15</span></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>14:00</td>
            <td>14:30</td>
            <td>14:21<br/>14:56</td>
            <td>14:00</td>
            <td>
              <span className="weekend">14:00</span>
            </td>
            <td><span className="weekend">14:15</span></td>
            <td></td>
            <td>14:36</td>
            <td>14:00</td>
          </tr>
          <tr>
            <td>15:00</td>
            <td>15:10<br/>15:45</td>
            <td>15:31</td>
            <td>15:00<br/>
              <span className="bigstop">15:30</span></td>
            <td>
              <span className="weekday">15:00</span>
            </td>
            <td><span className="weekday">15:15</span></td>
            <td>15:30</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>16:00</td>
            <td>16:20<br/>16:55</td>
            <td>16:06<br/>16:41</td>
            <td>16:00</td>
            <td>16:00</td>
            <td>16:15</td>
            <td></td>
            <td>16:36</td>
            <td>16:00</td>
          </tr>
          <tr>
            <td>17:00</td>
            <td>17:30</td>
            <td>17:16<br/>17:46</td>
            <td>17:00</td>
            <td>
              <span className="weekday">17:00</span></td>
            <td>
              <span className="weekday">17:15</span>
            </td>
            <td>17:30</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>18:00</td>
            <td>18:05<br/>18:35</td>
            <td></td>
            <td>18:00</td>
            <td>18:00</td>
            <td>18:15</td>
            <td></td>
            <td>18:36</td>
            <td>18:00</td>
          </tr>
          <tr>
            <td>19:00</td>
            <td></td>
            <td></td>
            <td>19:00</td>
            <td>
              <span  className="weekday">19:00</span>
             </td>
            <td><span  className="weekday">19:15</span>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>20:00</td>
            <td></td>
            <td></td>
            <td>20:00<br/>20:50</td>
            <td>
              <span  className="weekday">20:00</span><br/>
              20:30
            </td>
            <td><span  className="weekday">20:15</span><br/>
              20:45
            </td>
            <td></td>
            <td></td>
            <td>20:20</td>
          </tr>
          <tr>
            <td>21:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td>21:00</td>
            <td>21:15</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>22:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td>22:00</td>
            <td>22:15</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <div className="fixedbot">
          <NaviLink href={UrlConstants.Booking} title='同济班车' className="button"></NaviLink>
        </div>
      </div>
    );
  }
});

module.exports = Home;
