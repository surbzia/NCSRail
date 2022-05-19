<template>
  <div>
    <div class="c-view">
      <!-- WASHROOM -->
      <div class="row align-items-center mb-8">
        <div class="mcol mcol-left">
          <div class="title-view">
            <p>Enter</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-6 pad-5">
              <div class="w-view">
                <div class="img-holder">
                  <img src="@/assets/washroom.png" alt="" />
                </div>
                <p>Washroom</p>
              </div>
            </div>
            <div class="col-sm-6 pad-5">
              <div class="w-view">
                <div class="img-holder">
                  <img src="@/assets/washroom.png" alt="" />
                </div>
                <p>Washroom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END WASHROOM -->

      <!-- COMPARTMENT -->
      <!-- TOP ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div>
              <div class="p-side mpad">
                <p>
                  <span class="seat-num">61S</span><br /><span
                    class="seat-price"
                    >Rs.400</span
                  >
                </p>
              </div>
              <div class="i-side mpad">
                <img src="@/assets/seat01.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END TOP ROW -->

      <!-- TABLE ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END TABLE ROW -->

      <!-- BOTTOM ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END BOTTOM ROW -->

      <!-- TOP ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END TOP ROW -->

      <!-- TABLE ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END TABLE ROW -->

      <!-- TOP ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END TOP ROW -->

      <!-- TABLE ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END TABLE ROW -->

      <!-- BOTTOM ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END BOTTOM ROW -->

      <!-- TOP ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END TOP ROW -->

      <!-- TABLE ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END TABLE ROW -->

      <!-- BOTTOM ROW -->
      <div class="row align-items-center m-row mt-4">
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END BOTTOM ROW -->
      </div>

      <div class="row align-items-center m-row mt-4">
        <!-- TOP ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex s-box">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex s-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex s-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END TOP ROW -->
        <!-- TABLE ROW -->
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
        <!-- END TABLE ROW -->

        <!-- BOTTOM ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END BOTTOM ROW -->
      </div>
      <div class="row align-items-center m-row mt-4">
        <!-- TOP ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END TOP ROW -->
        <!-- TABLE ROW -->
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
        <!-- END TABLE ROW -->

        <!-- BOTTOM ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END BOTTOM ROW -->
      </div>
      <div class="row align-items-center m-row mt-4">
        <!-- TOP ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END TOP ROW -->
        <!-- TABLE ROW -->
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
        <!-- END TABLE ROW -->

        <!-- BOTTOM ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END BOTTOM ROW -->
      </div>
      <div class="row align-items-center m-row mt-4">
        <!-- TOP ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END TOP ROW -->
        <!-- TABLE ROW -->
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
        <!-- END TABLE ROW -->

        <!-- BOTTOM ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END BOTTOM ROW -->
      </div>
      <div class="row align-items-center m-row mt-4">
        <!-- TOP ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END TOP ROW -->
        <!-- TABLE ROW -->
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
        <!-- END TABLE ROW -->

        <!-- BOTTOM ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END BOTTOM ROW -->
      </div>
      <div class="row align-items-center m-row mt-4">
        <!-- TOP ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END TOP ROW -->
        <!-- TABLE ROW -->
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
        <!-- END TABLE ROW -->

        <!-- BOTTOM ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END BOTTOM ROW -->
      </div>
      <div class="row align-items-center m-row mt-4">
        <!-- TOP ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>Top</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>mid</span>
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex b-box">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                  <span>low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END TOP ROW -->

        <!-- TABLE ROW -->
        <div class="mcol mcol-left">
          <div class="table-box d-flex">
            <p>Table</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5 offset-md-8">
              <div class="table-box d-flex">
                <p><span>Table</span><span>|</span><span>Cabin</span></p>
              </div>
            </div>
          </div>
        </div>
        <!-- END TABLE ROW -->

        <!-- BOTTOM ROW -->
        <div class="mcol mcol-left">
          <div class="a-box d-flex" @click="selectSeat">
            <div class="p-side mpad">
              <p>
                <span class="seat-num">61S</span><br /><span class="seat-price"
                  >Rs.400</span
                >
              </p>
            </div>
            <div class="i-side mpad">
              <img src="@/assets/seat01.png" />
            </div>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 pad-5">
              <div class="a-box d-flex" @click="selectSeat">
                <div class="p-side mpad">
                  <p>
                    <span class="seat-num">61S</span><br /><span
                      class="seat-price"
                      >Rs.400</span
                    >
                  </p>
                </div>
                <div class="i-side mpad">
                  <img src="@/assets/seat02.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END BOTTOM ROW -->
      </div>
      <!-- END COMPARTMENT -->

      <!-- WASHROOM -->
      <div class="row align-items-center mt-5">
        <div class="mcol mcol-left">
          <div class="title-view">
            <p>Enter</p>
          </div>
        </div>
        <div class="mcol mcol-right">
          <div class="row">
            <div class="col-sm-6 pad-5">
              <div class="w-view">
                <div class="img-holder">
                  <img src="@/assets/washroom.png" alt="" />
                </div>
                <p>Washroom</p>
              </div>
            </div>
            <div class="col-sm-6 pad-5">
              <div class="w-view">
                <div class="img-holder">
                  <img src="@/assets/washroom.png" alt="" />
                </div>
                <p>Washroom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END WASHROOM -->
    </div>
  </div>
</template>
<script>
import bookingService from "@/services/booking";
export default {
  props: {
    data: {
      default: {},
      type: Object,
    },
  },
  data() {
    return {
      expanded: [],
      singleExpand: true,
      trainCoachDTO: [],
      trainsHeader: [
        {
          text: "Train Name",
          align: "start",
          sortable: true,
          value: "trainName",
        },
        {
          text: "Train Code",
          align: "start",
          sortable: true,
          value: "trainCode",
        },
        {
          text: "Route",
          align: "start",
          sortable: true,
          value: "fromStationCode",
        },
        {
          text: "Duration",
          align: "start",
          sortable: true,
          value: "duration",
        },
        {
          text: "Stops",
          align: "start",
          sortable: true,
          value: "stops",
        },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  methods: {
    //   async selectTrainClass(selectedTrain,selectedClass) {
    //  let res = await bookingService.GetTrainDetails({selectedTrain:selectedTrain,selectedClass:selectedClass});
    //  if(res.status){
    //     this.$emit('availableTrainsSection',false);
    //     this.$emit('CoachesSection',true);
    //     this.trainCoachDTO = res.trainCoachDTO;
    //  }
    // },

    selectSeat(event) {
      if (event.target.className == "a-box d-flex") {
        event.target.className = "a-box d-flex s-box";
      } else {
        event.target.className = "a-box d-flex";
      }
    },

  },
};
</script>