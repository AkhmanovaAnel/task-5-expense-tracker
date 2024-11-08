<template>
  <form @submit.prevent="addTransaction">
    <select v-model="transaction.type">
      <option value="income">Доход</option>
      <option value="expense">Расход</option>
    </select>
    <input v-model="transaction.category" placeholder="Категория" required />
    <input v-model.number="transaction.amount" type="number" placeholder="Сумма" required />
    <button type="submit">Добавить</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transaction: { type: '', category: '', amount: 0 }
    };
  },
  methods: {
    async addTransaction() {
      await axios.post('/api/transactions', this.transaction);
      this.$emit('transactionAdded');
    }
  }
};
</script>
