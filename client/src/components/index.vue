<template>
  <div>
    <template>
      <span class="spanText">Prize level:</span>
      <el-select v-model="prizeLevel" placeholder="Select Prize Level">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="spanText">Total employees(Including wined):</span>
      <el-input-number v-model="employees" :min="1" :max="10000"></el-input-number>
      <span class="spanText">Draw quantity for this time:</span>
      <el-input-number v-model="drawQuantity" :min="1" :max="100"></el-input-number>
    </template>
    <div>
      <div class="main-box">
        <p class="prizeText">{{prizeLevel ? options[prizeLevel - 1].prize : ""}}</p>
        <div class="main">
          <!--数字背景盒子-->
          <div class="num-bg-box">
            <!--数字盒子-->
            <div class="num_box">
              <div class="num"></div>
              <div class="num"></div>
              <div class="num"></div>
              <div class="num"></div>
              <div class="num"></div>
            </div>
          </div>
          <div class="btn-box">

            <el-button type="success" plain @click="startDraw()">Start</el-button>
            <el-button type="danger" plain @click="stopDraw()">Stop</el-button>
          </div>
        </div>
      </div>
      <div class="history-box">
        <p class="winnerText">Winners</p>
        <el-card class="box-card">
          <div v-for="w in winners" :key="o" class="text item">
            {{w}}
          </div>
        </el-card>
      </div>

    </div>

  </div>
</template>
<script>
  //import jquery
  import $ from 'jquery'
  import {drawWinners} from '@/api/drawWinners'
  import {validate} from '@/api/validate'
  import {getPrizeInfo} from '@/api/getPrizeInfo'
  import {getWinners} from '@/api/getWinners'

  export default {
    data() {
      return {
        u: 100,
        interval: "",
        isBegin: false,
        employees: 1,
        drawQuantity: 1,
        prizeLevel: null,
        drawData: {},
        options: null,
        winners: null
      };
    },
    created: async function () {
      $(".num").css('backgroundPositionY', 1000);
      this.options = await getPrizeInfo();
      this.winners = await getWinners();
    },
    methods: {
      /*initNumberBox: function () {
        $(".num").css('backgroundPositionY', 1000);
      },*/
      roll: function () {
        let u = this.u;
        let n = 1;
        this.interval = setInterval(function () {
          n++;
          run();
        }, 100);

        //执行数字滚动
        function run() {
          $(".num").each(function (index) {
            let _num = $(this);
            _num.animate({
              backgroundPositionY: ((u + 1) * n * (index + 1))
            }, 100);
          });
        }
      },
      stopRoll: function (newWinner) {
        let u = this.u;
        let timer;
        let num_arr = newWinner; //指定中奖结果,可以抽取指定数组中的某一个
        $(function () {

          $(".num").each(function (index) {
            let _num = $(this);
            setTimeout(function () {
              _num.animate({
                backgroundPositionY: (u * 60) - (u * num_arr[index])
              }, {
                duration: 500,
                complete: function () {
                }
              });
            }, 100);
          });
          window.clearTimeout(timer);
        });
      },
      startDraw: async function () {
        if (this.isBegin === true) {
          alert("Drawing!");
          return;
        }

        let employees = this.employees;
        let drawQuantity = this.drawQuantity;
        let prizeLevel = this.prizeLevel;
        this.drawData.employees = employees;
        this.drawData.drawQuantity = drawQuantity;
        this.drawData.prizeLevel = prizeLevel;
        let rtn = await validate(this.drawData);
        if (rtn.status === "pass") {
          this.roll();
          this.isBegin = true;
        }
        if (rtn.status === "fail" && rtn.message === "The prize level is drawn!") {
          this.$confirm(`${rtn.message} Will you wan to re-draw?`, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true
          }).then(() => {
            this.roll();
            this.isBegin = true;
            this.drawData.reDraw = true;
            this.$message({
              type: 'success',
              message: 'Start to re-draw!'
            });
          }).catch(() => {
            this.isBegin = false;
            this.$message({
              type: 'info',
              message: 'Not re-draw!'
            });
          });
        }
        if (rtn.status === "fail" && rtn.message !== "The prize level is drawn!") {
          alert(rtn.message);
        }
      },
      stopDraw: async function () {
        if (this.isBegin === false) {
          alert("Start first");
          return;
        }
        this.isBegin = false;
        //request server
        let employees = this.employees;
        let drawQuantity = this.drawQuantity;
        let prizeLevel = this.prizeLevel;
        this.drawData.employees = employees;
        this.drawData.drawQuantity = drawQuantity;
        this.drawData.prizeLevel = prizeLevel;
        let winnerRtn = await drawWinners(this.drawData);
        this.drawData.reDraw = false;
        if (winnerRtn.status === "fail" && winnerRtn.message !== "The prize level is drawn!") {
          alert(winnerRtn.message);
        }
        console.log(winnerRtn.newWinners);
        clearInterval(this.interval);
        this.stopRoll(winnerRtn.newWinners);
        this.winners = await getWinners();
      }
    }
  }
</script>
<style>
  @import '../styles/index.css';

  .spanText {
    background-color: mistyrose;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 400px;
  }

</style>
