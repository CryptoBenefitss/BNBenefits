import './App.css';
import React from 'react';
import Web3 from 'web3';
import styled from 'styled-components';

class App extends React.Component {
  CONTRACT_ADDRESS = "0x830a01d661f8a76f795f74b36CBC6406B01E562c";
  ABI = [{"constant":true,"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserDownlineCount","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserAvailable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TIME_STEP","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReferrer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReferralTotalBonus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PROJECT_FEE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERCENT_STEP","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"referrer","type":"address"},{"name":"plan","type":"uint8"}],"name":"invest","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"plan","type":"uint8"},{"name":"deposit","type":"uint256"}],"name":"getResult","outputs":[{"name":"percent","type":"uint256"},{"name":"profit","type":"uint256"},{"name":"finish","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"REFERRAL_PERCENTS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalRefBonus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReferralWithdrawn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserTotalDeposits","outputs":[{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"plan","type":"uint8"}],"name":"getPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserAmountOfDeposits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"plan","type":"uint8"}],"name":"getPlanInfo","outputs":[{"name":"time","type":"uint256"},{"name":"percent","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getUserDepositInfo","outputs":[{"name":"plan","type":"uint8"},{"name":"percent","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"profit","type":"uint256"},{"name":"start","type":"uint256"},{"name":"finish","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startUNIX","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DEVELOPER_FEE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserCheckpoint","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INVEST_MIN_AMOUNT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReferralBonus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_developer","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"}],"name":"Newbie","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"plan","type":"uint8"},{"indexed":false,"name":"percent","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"profit","type":"uint256"},{"indexed":false,"name":"start","type":"uint256"},{"indexed":false,"name":"finish","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"referrer","type":"address"},{"indexed":true,"name":"referral","type":"address"},{"indexed":true,"name":"level","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"}]

  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      bnbBenefits: {},
      contractBalance: 0,
      stackedBalance: 0,
      plan1Input: '',
      plan2Input: '',
      plan3Input: '',
      plan4Input: '',
      plan5Input: '',
      plan6Input: '',
      userDeposits: [],
      plan1: {
        dailyProfit: '...',
        totalReturn: '...',
        withdrawTime: 'Any Time',
        days: '...',
        estimatedProfit: '...'
      },
      percentPlan1: 0,
      plan2: {
        dailyProfit: '...',
        totalReturn: '...',
        withdrawTime: 'Any Time',
        days: '...',
        estimatedProfit: '...'
      },
      percentPlan2: 0,
      plan3: {
        dailyProfit: '...',
        totalReturn: '...',
        withdrawTime: 'Any Time',
        days: '...',
        estimatedProfit: '...'
      },
      percentPlan3: 0,
      plan4: {
        dailyProfit: '...',
        totalReturn: '...',
        withdrawTime: 'End of Plan',
        days: '...',
        estimatedProfit: '...'
      },
      percentPlan4: 0,
      plan5: {
        dailyProfit: '...',
        totalReturn: '...',
        withdrawTime: 'End of Plan',
        days: '...',
        estimatedProfit: '...'
      },
      percentPlan5: 0,
      plan6: {
        dailyProfit: '...',
        totalReturn: '...',
        withdrawTime: 'End of Plan',
        days: '...',
        estimatedProfit: '...'
      },
      percentPlan6: 0,
      bnbPrice: '',
      userDeposit: 0,
      userAvailableWithdrawal: 0,
      userReferralTotalBonus: 0,
      userReferralWithdrawn: 0,
      getUserDownlineCount: 0,
    };
  }
  async componentDidMount() {
      await this.connectWallet();
      await this.runAPP();
  }

    async connectWallet() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
    }

    async runAPP(){
        let networkID = await window.web3.eth.net.getId()
        if (networkID === 97) {
            const contract = await new window.web3.eth.Contract(this.ABI, this.CONTRACT_ADDRESS);
            let accounts = await window.web3.eth.getAccounts();
            this.setState({ contract });
            this.setState({ account: accounts[0] });
            await this.loadContractInformation();
            setInterval(async () => {
                await this.loadContractInformation();
            }, 10000);
        }
  }

    async loadContractInformation() {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd&include_24hr_change=true');
        const jsonResponse = await response.json();
        const bnbUSDPrice = jsonResponse.binancecoin.usd;
        this.setState({bnbPrice: bnbUSDPrice});
        const contractBalance = await this.state.contract.methods.getContractBalance().call();
        const stackedBalance = await this.state.contract.methods.totalStaked().call();
        this.setState({contractBalance: (contractBalance / 1e18).toFixed(2)});
        this.setState({stackedBalance: (stackedBalance / 1e18).toFixed(2)});
        await this.loadPlan1();
        await this.loadPlan2();
        await this.loadPlan3();
        await this.loadPlan4();
        await this.loadPlan5();
        await this.loadPlan6();
        const userDeposit = await this.state.contract.methods.getUserTotalDeposits(this.state.account).call();
        this.setState({userDeposit: (userDeposit / 1e18).toFixed(2)});
        const userAvailableWithdrawal = await this.state.contract.methods.getUserAvailable(this.state.account).call();
        this.setState({userAvailableWithdrawal: (userAvailableWithdrawal / 1e18).toFixed(2)});
        await this.userDeposits();
        const userReferralTotalBonus = await this.state.contract.methods.getUserReferralTotalBonus(this.state.account).call();
        this.setState({userReferralTotalBonus: (userReferralTotalBonus / 1e18).toFixed(2)});
        const userReferralWithdrawn = await this.state.contract.methods.getUserReferralWithdrawn(this.state.account).call();
        this.setState({userReferralWithdrawn: (userReferralWithdrawn / 1e18).toFixed(2)});
        const getUserDownlineCount = await this.state.contract.methods.getUserDownlineCount(this.state.account).call();
        const sum = parseInt(getUserDownlineCount[0]) + parseInt(getUserDownlineCount[1]) + parseInt(getUserDownlineCount[2])
        this.setState({getUserDownlineCount: sum.toFixed(0)});
    }

    async loadPlan1() {
    const planInfo = await this.state.contract.methods.getPlanInfo(0).call();
    const percentPlan1 = await this.state.contract.methods.getPercent(0).call();
    const daily = (percentPlan1 / 10).toFixed(0);
    const total = ((percentPlan1 / 10) * planInfo.time).toFixed(0);
    this.setState({percentPlan1: (total / 100).toFixed(4)});
    const plan1 = {
      dailyProfit: daily,
      totalReturn: total,
      withdrawTime: 'Any Time',
      days: planInfo.time,
      estimatedProfit: '0',
    };
    this.setState({plan1: plan1});
  }

  async loadPlan2() {
    const planInfo = await this.state.contract.methods.getPlanInfo(1).call();
    const percentPlan2 = await this.state.contract.methods.getPercent(1).call();
    const daily = (percentPlan2 / 10).toFixed(0);
    const total = ((percentPlan2 / 10) * planInfo.time).toFixed(0);
    this.setState({percentPlan2: (total / 100).toFixed(4)});
    const plan2 = {
      dailyProfit: daily,
      totalReturn: total,
      withdrawTime: 'Any Time',
      days: planInfo.time,
      estimatedProfit: '0',
    };
    this.setState({plan2: plan2});
  }

  async loadPlan3() {
    const planInfo = await this.state.contract.methods.getPlanInfo(2).call();
    const percentPlan3 = await this.state.contract.methods.getPercent(2).call();
    const daily = (percentPlan3 / 10).toFixed(0);
    const total = ((percentPlan3 / 10) * planInfo.time).toFixed(0);
    this.setState({percentPlan3: (total / 100).toFixed(4)});
    const plan3 = {
      dailyProfit: daily,
      totalReturn: total,
      withdrawTime: 'Any Time',
      days: planInfo.time,
      estimatedProfit: '0',
    };
    this.setState({plan3: plan3});
  }

  async loadPlan4() {
    const planInfo = await this.state.contract.methods.getPlanInfo(3).call();
    const percentPlan4 = await this.state.contract.methods.getResult(3,100).call();
    const percent = percentPlan4.percent;
    const daily = (percent / 10).toFixed(0);
    const total = percentPlan4.profit

    this.setState({percentPlan4: (total / 100).toFixed(4)});
    const plan4 = {
      dailyProfit: daily,
      totalReturn: total,
      withdrawTime: 'End of Plan',
      days: planInfo.time,
      estimatedProfit: '0',
    };
    this.setState({plan4: plan4});
  }

  async loadPlan5() {
    const planInfo = await this.state.contract.methods.getPlanInfo(4).call();
    const percentPlan5 = await this.state.contract.methods.getResult(4,100).call();
    const percent = percentPlan5.percent;
    const daily = (percent / 10).toFixed(0);
    const total = percentPlan5.profit

    this.setState({percentPlan5: (total / 100).toFixed(4)});
    const plan5 = {
      dailyProfit: daily,
      totalReturn: total,
      withdrawTime: 'End of Plan',
      days: planInfo.time,
      estimatedProfit: '0',
    };
    this.setState({plan5: plan5});
  }

  async loadPlan6() {
    const planInfo = await this.state.contract.methods.getPlanInfo(5).call();
    const percentPlan6 = await this.state.contract.methods.getResult(5,100).call();
    const percent = percentPlan6.percent;
    const daily = (percent / 10).toFixed(0);
    const total = percentPlan6.profit

    this.setState({percentPlan6: (total / 100).toFixed(4)});
    const plan6 = {
      dailyProfit: daily,
      totalReturn: total,
      withdrawTime: 'Any Time',
      days: planInfo.time,
      estimatedProfit: '0',
    };
    this.setState({plan6: plan6});
  }

  render() {
    return <>
      <NavBarContainer>
        <img className={'img-logo'} src={'https://bnbearn.app/img/Logo.png'}/>
        <NavBarLeft>
          <a className={'nav-button'} onClick={async () => await this.connectWallet()}>Connect Wallet</a>
          <a className={'nav-button'}
             href={'https://testnet.bscscan.com/address/0x830a01d661f8a76f795f74b36cbc6406b01e562c'}
             target={'_blank'}
             rel={'noreferrer'}
          >Contract</a>
          <a className={'nav-button'} href={'https://google.com'} target={'_blank'} rel={'noreferrer'}>Telegram</a>
          <a className={'nav-button'} href={'https://google.com'} target={'_blank'} rel={'noreferrer'}>{this.accountAddressResumed()}</a>
        </NavBarLeft>
      </NavBarContainer>
      <BodyContainer>
        <InformationContainer>
          <ContractInformationCard>
            <h2>Contract Information</h2>
            <p>Total Stacked</p>
            <p style={{ fontSize: 30, fontWeight: 'bold', marginTop: 0, marginBottom: 0 }}>{this.stackedBalance()}</p>
            <p>Total Contract Balance</p>
            <p style={{ fontSize: 30, fontWeight: 'bold', marginTop: 0, marginBottom: 0 }}>{this.contractBalance()}</p>
          </ContractInformationCard>
          <BNBInformation>
            <h3>1 BNB = ${this.state.bnbPrice}</h3>
            <h4>Daily incomes from 10% to 20%</h4>
            <h4>Minimal deposit: 0.05 BNB, no maximal limit</h4>
            <h4>Withdraw any time for plans 1, 2 and 3. Withdraw at the end of plan for plans 4, 5 and 6</h4>
          </BNBInformation>
        </InformationContainer>
        <BasicPlans>
          <BasicPlan>
            <h2>Plan 1</h2>
            <PlanInformation>
              <p>Daily Profit</p>
              <p>{this.state.plan1.dailyProfit}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Total Return</p>
              <p>{this.state.plan1.totalReturn}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Withfraw time</p>
              <p>Any Time</p>
            </PlanInformation>
            <PlanInformation>
              <p>Days</p>
              <p>{this.state.plan1.days}</p>
            </PlanInformation>
            <PlanInformation>
              <p>Estimated return</p>
              <p>{(this.state.plan1Input * this.state.percentPlan1).toFixed(2)}</p>
            </PlanInformation>
            <Input type={'text'} placeholder={'Enter an amount'} value={this.state.plan1Input}  onChange={(event) => {
              this.setState({plan1Input: event.target.value});
            }}/> <br/>
            <BasicPlanButton onClick={() => this.stack(0, this.state.plan1Input)}>Stake BNB</BasicPlanButton>
          </BasicPlan>
          <BasicPlan>
            <h2>Plan 2</h2>
            <PlanInformation>
              <p>Daily Profit</p>
              <p>{this.state.plan2.dailyProfit}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Total Return</p>
              <p>{this.state.plan2.totalReturn}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Withfraw time</p>
              <p>Any Time</p>
            </PlanInformation>
            <PlanInformation>
              <p>Days</p>
              <p>{this.state.plan2.days}</p>
            </PlanInformation>
            <PlanInformation>
              <p>Estimated return</p>
              <p>{(this.state.plan2Input * this.state.percentPlan2).toFixed(2)}</p>
            </PlanInformation>
            <Input type={'text'} placeholder={'Enter an amount'} value={this.state.plan2Input}  onChange={(event) => this.setState({ plan2Input: event.target.value })}/> <br/>
            <BasicPlanButton onClick={() => this.stack(1, this.state.plan2Input)}>Stake BNB</BasicPlanButton>
          </BasicPlan>
          <BasicPlan>
            <h2>Plan 3</h2>
            <PlanInformation>
              <p>Daily Profit</p>
              <p>{this.state.plan3.dailyProfit}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Total Return</p>
              <p>{this.state.plan3.totalReturn}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Withfraw time</p>
              <p>Any Time</p>
            </PlanInformation>
            <PlanInformation>
              <p>Days</p>
              <p>{this.state.plan3.days}</p>
            </PlanInformation>
            <PlanInformation>
              <p>Estimated return</p>
              <p>{(this.state.plan3Input * this.state.percentPlan3).toFixed(2)}</p>
            </PlanInformation>
            <Input type={'text'} placeholder={'Enter an amount'} value={this.state.plan3Input}  onChange={(event) => this.setState({ plan3Input: event.target.value })}/> <br/>
            <BasicPlanButton onClick={() => this.stack(2, this.state.plan3Input)}>Stake BNB</BasicPlanButton>
          </BasicPlan>
        </BasicPlans>
        <StackedPlans>
          <StackedPlan>
            <h2>Plan 4</h2>
            <PlanInformation>
              <p>Daily Profit</p>
              <p>{this.state.plan4.dailyProfit}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Total Return</p>
              <p>{this.state.plan4.totalReturn}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Withfraw time</p>
              <p>End of plan</p>
            </PlanInformation>
            <PlanInformation>
              <p>Days</p>
              <p>{this.state.plan4.days}</p>
            </PlanInformation>
            <PlanInformation>
              <p>Estimated return</p>
              <p>{(this.state.plan4Input * this.state.percentPlan4).toFixed(2)}</p>
            </PlanInformation>
            <Input type={'text'} placeholder={'Enter an amount'} value={this.state.plan4Input}  onChange={(event) => this.setState({ plan4Input: event.target.value })}/> <br/>
            <StackedPlanButton onClick={() => this.stack(3, this.state.plan4Input)}>Stake BNB</StackedPlanButton>
          </StackedPlan>
          <StackedPlan>
            <h2>Plan 5</h2>
            <PlanInformation>
              <p>Daily Profit</p>
              <p>{this.state.plan5.dailyProfit}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Total Return</p>
              <p>{this.state.plan5.totalReturn}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Withfraw time</p>
              <p>End of plan</p>
            </PlanInformation>
            <PlanInformation>
              <p>Days</p>
              <p>{this.state.plan5.days}</p>
            </PlanInformation>
            <PlanInformation>
              <p>Estimated return</p>
              <p>{(this.state.plan5Input * this.state.percentPlan5).toFixed(2)}</p>
            </PlanInformation>
            <Input type={'text'} placeholder={'Enter an amount'} value={this.state.plan5Input}  onChange={(event) => this.setState({ plan5Input: event.target.value })}/> <br/>
            <StackedPlanButton onClick={() => this.stack(4, this.state.plan5Input)}>Stake BNB</StackedPlanButton>
          </StackedPlan>
          <StackedPlan>
            <h2>Plan 6</h2>
            <PlanInformation>
              <p>Daily Profit</p>
              <p>{this.state.plan6.dailyProfit}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Total Return</p>
              <p>{this.state.plan6.totalReturn}%</p>
            </PlanInformation>
            <PlanInformation>
              <p>Withfraw time</p>
              <p>End of plan</p>
            </PlanInformation>
            <PlanInformation>
              <p>Days</p>
              <p>{this.state.plan6.days}</p>
            </PlanInformation>
            <PlanInformation>
              <p>Estimated return</p>
              <p>{(this.state.plan6Input * this.state.percentPlan6).toFixed(2)}</p>
            </PlanInformation>
            <Input type={'text'} placeholder={'Enter an amount'} value={this.state.plan6Input}  onChange={(event) => this.setState({ plan6Input: event.target.value })}/> <br/>
            <StackedPlanButton onClick={() => this.stack(5, this.state.plan6Input)}>Stake BNB</StackedPlanButton>
          </StackedPlan>
        </StackedPlans>
        <UserInformation>
          <ContractInformationCard>
            <h2>User Information</h2>
            <p>Total Stacked in BNB</p>
            <p style={{ fontSize: 30, fontWeight: 'bold', marginTop: 0, marginBottom: 0 }}>{this.userDeposit()}</p>
            <p>Available BNB for withdrawal</p>
            <p style={{ fontSize: 30, fontWeight: 'bold', marginTop: 0, marginBottom: 0 }}>{this.userAvailableWithdrawal()}</p>
            <BasicPlanButton onClick={() => this.withdrawBNB()}>Withdraw BNB</BasicPlanButton>
          </ContractInformationCard>
            <UserReferralCard>
                <p>Your Referral Link</p>
                <span>https://BNBenefits.com/?ref={this.state.account}</span>
                <p>Total Referral Earned: {this.state.userReferralTotalBonus}</p>
                <p>Total Referral Withdrawn: {this.state.userReferralWithdrawn}</p>
                <p>Total Referrals: {this.state.getUserDownlineCount}</p>
            </UserReferralCard>
        </UserInformation>
        <UserPlans>
          {this.state.userDeposits.map(userDeposit => {
            if (userDeposit.plan <= 3) {
              return   <BasicUserPlan>
                <h2>{userDeposit.plan}</h2>
                <PlanInformation>
                  <p>Deposit: <span>{userDeposit.amount}</span></p>
                  <p>Profit: <span>{userDeposit.profit}</span></p>
                </PlanInformation>
                <div className="main__stake-range">
                  <div className="main__stake-result" style={{ width: `${userDeposit.percents}%` }} >{userDeposit.percents}%</div>
                </div>
              </BasicUserPlan>
            } else {
              return   <StackedUserPlan>
                <h2>{userDeposit.plan}</h2>
                <PlanInformation>
                  <p>Deposit: <span>{userDeposit.amount}</span></p>
                  <p>Profit: <span>{userDeposit.profit}</span></p>
                </PlanInformation>
                <div className="main__stake-range">
                  <div className="main__stake-result-stacked" style={{ width: `${userDeposit.percents}%` }}>{userDeposit.percents}%</div>
                </div>
              </StackedUserPlan>
            }
          })}
        </UserPlans>
      </BodyContainer>
    </>
  }

  stack(plan, value) {
    if (this.state.contract === undefined) return;
    const amount = value * 1e18
    const gasPrice = '10000000000'
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userReferral = urlParams.get('ref');
    console.log(userReferral);
    const referral = userReferral ? userReferral : '0x9fE3488C7C1ff3Fd2f2Ae84fb9C80Bc9AD87b065';
    console.log(referral);
    this.state.contract.methods.invest(referral, plan).send({
      value: amount,
      from: this.state.account,
      gasPrice: gasPrice,
    })
  }

  withdrawBNB() {
    const gasPrice = '10000000000'
    if (this.state.contract === undefined) return;
    this.state.contract.methods.withdraw().send({
      value: 0,
      from: this.state.account,
      gasPrice: gasPrice
    })
  }

  async userDeposits() {
    const amountOfUserDeposits = await this.state.contract.methods.getUserAmountOfDeposits(this.state.account).call();
    const userDeposits = []

    for(let i = 0; i<amountOfUserDeposits;i++) {
      const r = await this.state.contract.methods.getUserDepositInfo(this.state.account,i).call();
        const amount = r.amount
        const profit = r.profit
        const plan = parseInt(r.plan) + 1
        const start = r.start
        const finish = r.finish

        const now = (new Date().valueOf() / 1000).toFixed(0)

        const dif = (now - start) / 60*60*24
        const totalTime = (finish-start) / 60*60*24

        const percents = ((dif / totalTime)*100).toFixed(2)
        userDeposits.push({ plan: plan, amount: (amount/1e18).toFixed(2), profit: (profit/1e18).toFixed(2), percents: percents });
    }
    this.setState({ userDeposits: userDeposits });
  }

  contractBalance() {
    if (this.state.contract === undefined) return <>...</>;
    return <>{this.state.contractBalance}</>;
  }

  stackedBalance() {
    if (this.state.contract === undefined) return <>...</>;
    return <>{this.state.stackedBalance}</>;
  }

  userDeposit() {
    if (this.state.contract === undefined) return <>...</>;
    return <>{this.state.userDeposit}</>;
  }

  userAvailableWithdrawal() {
    if (this.state.contract === undefined) return <>...</>;
    return <>{this.state.userAvailableWithdrawal}</>;
  }


  accountAddressResumed() {
    if (this.state.account === '0x0') return <>0x0</>;
    const accountAddressSize = this.state.account.length;
    return <>
      {
        this.state.account[0] + this.state.account[1] + this.state.account[2] +
        this.state.account[3] + this.state.account[4] + this.state.account[5] + '...' +
        this.state.account[accountAddressSize - 4] + this.state.account[accountAddressSize - 3] +
        this.state.account[accountAddressSize - 2] + this.state.account[accountAddressSize - 1]
      }</>;
  }
};

const NavBarContainer = styled.div`
  height: 60px;
  padding-top: 30px;
  background-color: rgb(25, 28, 36);
  border-bottom: 1px solid #DD0426;
  
  .img-logo {
    margin-left: 50px;
  }
`;

const NavBarLeft = styled.div`
  position: relative;
  float: right;
   
  .nav-button {
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-right: 20px;
    border-radius: 2px;
    height: 30px;
    width: 150px;
    text-align: center;
    border-color: #DD0426;
    text-decoration-line: none;
    display: block;
    cursor: pointer;
    float: left;
  }
`;

const BNBInformation = styled.div`
  margin-left: 30px;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InformationContainer = styled.div`
  margin-top: 100px;
  margin-left: 50px;
  display: flex;
  flex-direction: row;
`;

const UserPlans = styled.div`
  margin-top: 100px;
  margin-left: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const UserReferralCard = styled.div`
  margin-left: 30px;
  height: 200px;
  width: 600px;
  padding: 15px;
  border: 1px solid #DD0426;
  background: linear-gradient(
          313.34deg
          , rgba(0, 0, 0, 0.3) -28.92%, rgba(255, 255, 255, 0.3) 130.82%), linear-gradient(
          360deg
          , #333 2.34%, #444 96.74%);

  p {
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
`;

const ContractInformationCard = styled.div`
  height: 200px;
  width: 300px;
  border: 1px solid #DD0426;
  margin-left: 30px;
  background: linear-gradient(
      313.34deg
      , rgba(0, 0, 0, 0.3) -28.92%, rgba(255, 255, 255, 0.3) 130.82%), linear-gradient(
      360deg
      , #333 2.34%, #444 96.74%);
  
  p {
    color: white;
    font-size: 18px;
    font-weight: bold;    
    margin-left: 10px;
  }

  position: relative;

  h2 {
    display: block;
    position: absolute;
    top: -45px;
    left: -3px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(221,4,32,1) 57%);

    padding: 8px 38px;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    border-radius: 3px;
    border: 1px solid #DD0426;
    -webkit-box-shadow: 0 2px 0 0 rgb(123 110 40 / 90%), 0 0 50px 0px rgb(0 0 0 / 80%);
    box-shadow: 0 2px 0 0 rgb(123 110 40 / 90%), 0 0 50px 0px rgb(0 0 0 / 80%);
  }
`;

const BasicPlans = styled.div`
  margin-top: 100px;
  margin-left: 50px;
  display: flex;
  flex-direction: row;
`;

const BasicPlan = styled.div`
  height: 350px;
  width: 300px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid #DD0426;
  padding: 40px 30px;
  background: linear-gradient(
      313.34deg
      , rgba(0, 0, 0, 0.3) -28.92%, rgba(255, 255, 255, 0.3) 130.82%), linear-gradient(
      360deg
      , #333 2.34%, #444 96.74%);

  p {
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  
  position: relative;
  
  h2 {
    display: block;
    position: absolute;
    top: -30px;
    left: -3px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(221,4,32,1) 57%);

    padding: 8px 38px;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    border-radius: 3px;
    border: 1px solid #DD0426;
    -webkit-box-shadow: 0 2px 0 0 rgb(123 110 40 / 90%), 0 0 50px 0px rgb(0 0 0 / 80%);
    box-shadow: 0 2px 0 0 rgb(123 110 40 / 90%), 0 0 50px 0px rgb(0 0 0 / 80%);
  }
`;

const BasicUserPlan = styled.div`
  height: 150px;
  width: 250px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid #DD0426;
  padding: 40px 30px;
  background: linear-gradient(
      313.34deg
      , rgba(0, 0, 0, 0.3) -28.92%, rgba(255, 255, 255, 0.3) 130.82%), linear-gradient(
      360deg
      , #333 2.34%, #444 96.74%);

  p {
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  
  position: relative;
  
  h2 {
    display: block;
    position: absolute;
    top: -30px;
    left: -3px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(221,4,32,1) 57%);

    padding: 8px 38px;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    border-radius: 3px;
    border: 1px solid #DD0426;
    -webkit-box-shadow: 0 2px 0 0 rgb(123 110 40 / 90%), 0 0 50px 0px rgb(0 0 0 / 80%);
    box-shadow: 0 2px 0 0 rgb(123 110 40 / 90%), 0 0 50px 0px rgb(0 0 0 / 80%);
  }
`;


const PlanInformation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StackedPlans = styled.div`
  margin-top: 100px;
  margin-left: 50px;
  display: flex;
  flex-direction: row;
`;

const StackedPlan = styled.div`
  height: 350px;
  width: 300px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid rgba(36,4,221,1);
  padding: 40px 30px;
  background: linear-gradient(
      313.34deg
      , rgba(0, 0, 0, 0.3) -28.92%, rgba(255, 255, 255, 0.3) 130.82%), linear-gradient(
      360deg
      , #333 2.34%, #444 96.74%);

  p {
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  
  position: relative;
  
  h2 {
    display: block;
    position: absolute;
    top: -30px;
    left: -3px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(36,4,221,1) 100%);

    padding: 8px 38px;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    border-radius: 3px;
    border: 1px solid rgba(36,4,221,1);
    -webkit-box-shadow: 0 2px 0 0 rgb(123 110 40 / 90%), 0 0 50px 0px rgb(0 0 0 / 80%);
    box-shadow: 0 2px 0 0 rgb(123 110 40 / 90%), 0 0 50px 0px rgb(0 0 0 / 80%);
  }
`;

const StackedUserPlan = styled.div`
  height: 150px;
  width: 250px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid rgba(36,4,221,1);
  padding: 40px 30px;
  background: linear-gradient(
      313.34deg
      , rgba(0, 0, 0, 0.3) -28.92%, rgba(255, 255, 255, 0.3) 130.82%), linear-gradient(
      360deg
      , #333 2.34%, #444 96.74%);

  p {
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  
  position: relative;
  
  h2 {
    display: block;
    position: absolute;
    top: -30px;
    left: -3px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(36,4,221,1) 100%);

    padding: 8px 38px;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    border-radius: 3px;
    border: 1px solid rgba(36,4,221,1);
    -webkit-box-shadow: 0 2px 0 0 rgb(123 110 40 / 90%), 0 0 50px 0px rgb(0 0 0 / 80%);
    box-shadow: 0 2px 0 0 rgb(123 110 40 / 90%), 0 0 50px 0px rgb(0 0 0 / 80%);
  }
`;

const Input = styled.input`
  background: white;
  border-radius: 2px;
  padding: 5px 50px 8px 10px;
  color: #353535 !important;
  width: 78%;
`;

const BasicPlanButton = styled.button`
  padding: 0px 20px;
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(221,4,32,1) 57%);
  font-weight: 800;
  font-size: 13px;
  color: #fff;
  width: 100%;
  margin: 10px auto;
  height: 30px;
  border: 1px solid #DD0426;
  border-radius: 3px;
  cursor: pointer;
`;

const StackedPlanButton = styled.button`
  padding: 0px 20px;
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(36,4,221,1) 100%);
  font-weight: 800;
  font-size: 13px;
  color: #fff;
  width: 100%;
  margin: 10px auto;
  height: 30px;
  border: 1px solid rgba(36,4,221,1);
  border-radius: 3px;
  cursor: pointer;
`;

const UserInformation = styled.div`
  margin-top: 100px;
  margin-left: 50px;
  display: flex;
  flex-direction: row;
`;

export default App;
