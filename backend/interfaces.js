const axios = require("axios");
const ethers = require("ethers");
const LotteryABI = require("./LotteryABI.json");

const lottery = "0xc3C7FD885E8743E3Edd0336decC93ebbFc12f094";
const rpc = "";
const provider = new ethers.providers.JsonRpcProvider(rpc);
const key = "";
const wallet = new ethers.Wallet(key, provider);
const contract = new ethers.Contract(lottery, LotteryABI, wallet);

const apikey = "";
const url = "";

const getDrawTimer = async () => {
  const response = await axios.post(
    url + "findOne",
    {
      collection: "Lotto_Timer_Automation",
      database: "Chainlink",
      dataSource: "Cluster0",
      filter: {
        name: "interval",
      },
    },
    {
      "Content-Type": "application/json",
      "api-key": apikey,
    }
  );
  const output = response.data;
  return output;
};

const storeTime = async (timeleft) => {
  const response = await axios.post(
    url + "updateOne",
    {
      collection: "Lotto_Timer_Automation",
      database: "Chainlink",
      dataSource: "Cluster0",
      filter: { name: "interval" },
      update: {
        name: "interval",
        time: timeleft,
      },
    },
    {
      "Content-Type": "application/json",
      "api-key": apikey,
    }
  );
  return response;
};

const openLotto = async () => {
  await contract
    .openLottery()
    .then((result) => {
      console.log("complete");
      return "complete";
    })
    .catch((error) => {
      console.log("error calling function");
    });
};

const closeLotto = async () => {
  await contract
    .closeLottery()
    .then((result) => {
      console.log("complete");
      return "complete";
    })
    .catch((error) => {
      console.log("error calling function");
    });
};

const drawNumbers = async () => {
  await contract
    .drawNumbers()
    .then((result) => {
      console.log("complete");
      return "complete";
    })
    .catch((error) => {
      console.log("error calling function");
    });
};

const countWinners = async () => {
  await contract
    .countWinners()
    .then((result) => {
      console.log("complete");
      return "complete";
    })
    .catch((error) => {
      console.log("error calling function");
    });
};

const currentLotto = async () => {
  const output = await contract.currentLotteryId().catch((error) => {
    console.log("error calling function");
  });
  const lottoId = output.toString();
  return lottoId;
};

const getBalance = async () => {
  const output = await contract.getBalance().catch((error) => {
    console.log("error calling function");
  });
  const balance = output.toString();
  return balance;
};

const getDrawJackpot = async () => {
  const output = await contract.currentLotteryId().catch((error) => {
    console.log("error calling function");
  });
  const lottoId = output.toString();
  const lottodata = await contract.viewLottery(lottoId).catch((error) => {
    console.log("error calling function");
  });
  return lottodata;
};

module.exports = {
  getDrawTimer,
  storeTime,
  openLotto,
  closeLotto,
  drawNumbers,
  countWinners,
  currentLotto,
  getBalance,
  getDrawJackpot,
};
