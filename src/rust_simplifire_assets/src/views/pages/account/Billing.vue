<template>
  <div class="container-fluid mt-4">
    <div class="row align-items-center">
      <div class="col-lg-4 col-sm-8">
        <nav-pill />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <div class="row mt-4">
          <div class="col-xl-6 mb-xl-0 mb-4">
            <master-card />
          </div>
          <div class="col-xl-6">
            <div class="row">
              <div class="col-md-6">
                <default-info-card
                  :classIcon="salary.classIcon"
                  :title="salary.title"
                  :desc="salary.desc"
                  :price="salary.price"
                  :iconName="salary.iconName"
                />
              </div>
              <div class="col-md-6">
                <default-info-card
                  :classIcon="paypal.classIcon"
                  :title="paypal.title"
                  :desc="paypal.desc"
                  :price="paypal.price"
                  :iconName="paypal.iconName"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12 mb-4">
            <payment-card />
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <invoice-card />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-7">
        <billing-card />
      </div>
      <div class="col-md-5 mt-4">
        <transaction-card />
      </div>
    </div>
  </div>
</template>

<script>
import NavPill from "./components/NavPill.vue";
import MasterCard from "examples/Cards/MasterCard.vue";
import DefaultInfoCard from "examples/Cards/DefaultInfoCard.vue";
import PaymentCard from "./components/PaymentCard.vue";
import InvoiceCard from "./components/InvoiceCard.vue";
import BillingCard from "./components/BillingCard.vue";
import TransactionCard from "./components/TransactionCard.vue";

export default {
  name: "Billing",
  components: {
    NavPill,
    MasterCard,
    DefaultInfoCard,
    PaymentCard,
    InvoiceCard,
    BillingCard,
    TransactionCard,
  },
  data() {
    return {
      salary: {
        iconName: "account_balance",
        classIcon: "text-white",
        title: "Salary",
        desc: "Belong Interactive",
        price: "+$2000",
      },
      paypal: {
        iconName: "account_balance_wallet",
        classIcon: "text-white",
        title: "Paypal",
        desc: "Freelance Payment",
        price: "$455.00",
      },
    };
  },
};
</script>
