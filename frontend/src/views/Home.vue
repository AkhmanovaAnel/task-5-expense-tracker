<template>
  <div>
    <h1>Баланс: {{ balance }}</h1>
    <AddTransaction @transactionAdded="fetchTransactions" />
    <ul>
      <li v-for="transaction in transactions" :key="transaction._id">
        {{ transaction.category }} - {{ transaction.amount }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import AddTransaction from '../components/AddTransaction.vue';

export default {
  components: { AddTransaction },
  data() {
    return {
      transactions: [],
      balance: 0
    };
  },
  methods: {
    async fetchTransactions() {
      const response = await axios.get('/api/transactions');
      this.transactions = response.data;
      this.calculateBalance();
    },
    calculateBalance() {
      this.balance = this.transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
      }, 0);
    }
  },
  mounted() {
    this.fetchTransactions();
  }
};
</script>
