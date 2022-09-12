import React, { Component } from 'react';
import '../../App.css';

class RightSidebar extends Component {
  render() {
    return (
      <div id="right_sidebar">
        <div id="right_sidebar_content">
          <div id="relationship_balances" class="active">
            <h2>Group balances</h2>

            <div class="full_group summary">
              <a
                data-toggle="modal"
                href="#group_member_details"
                data-id="18923083"
                data-group-id="19740563"
                class="personal_balance confirmed"
                rel="tooltip"
                data-original-title="<div class='left'><h2>Aayush Sukhadia</h2><h3>aayush.sukhadia@gmail.com</h3><hr>• gets back <span  class=positive>$4.10</span> from Balbhadra S.<br>• owes <span  class=negative>$145.66</span> to Bansil V.<br>• gets back <span  class=positive>$73.33</span> from Vastav P.<br>• owes <span  class=negative>$9.84</span> to Krunal<br>• owes <span  class=negative>$59.37</span> to PN<br>• gets back <span  class=positive>$56.53</span> from Parshwa G.<br>• gets back <span  class=positive>$49.11</span> from Yash B.<br>• gets back <span  class=positive>$0.09</span> from Harsh S.</div>"
              >
                <img
                  src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue38-100px.png"
                  class="avatar"
                  alt="img"
                />

                <div class="name">Aayush Sukhadia</div>

                <div class="balance i_owe">
                  owes <span class="amount">$31.71</span>
                </div>
              </a>
              <a
                data-toggle="modal"
                href="#group_member_details"
                data-id="26719514"
                data-group-id="19740563"
                class="personal_balance confirmed"
                rel="tooltip"
                data-original-title="<div class='left'><h2>Balbhadra Shah</h2><h3>balbhadra.shah@gmail.com</h3><hr>• owes <span  class=negative>$4.10</span> to Aayush S.<br>• gets back <span  class=positive>$200.83</span> from Vastav P.<br>• owes <span  class=negative>$15.71</span> to Krunal<br>• gets back <span  class=positive>$19.64</span> from Mohit P.<br>• gets back <span  class=positive>$17.57</span> from Yash B.<br>• gets back <span  class=positive>$19.63</span> from Harsh S.</div>"
              >
                <img
                  src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-orange15-100px.png"
                  class="avatar"
                  alt="img"
                />

                <div class="name">Balbhadra Shah</div>

                <div class="balance owes_me">
                  gets back <span class="amount">$237.86</span>
                </div>
              </a>

              <a data-toggle="modal" href="#settle_up" class="details">
                View details »
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RightSidebar;
