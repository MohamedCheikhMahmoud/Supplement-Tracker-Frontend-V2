<template>
  <section class="about-page">
    <div class="about-card glass-card">
      <p class="label">ABOUT THE PROJECT</p>
      <h1>MySupps</h1>

      <p>
        The idea behind MySupps originated from a personal problem I experienced while regularly
        going to the gym and trying to maintain a structured supplement routine.
      </p>

      <p>
        Although supplements can support fitness, recovery and overall health goals, I often
        struggled to consistently track my intake. It was difficult to remember when supplements had
        to be taken, which dosage was required or whether I had already taken them during the day.
      </p>

      <p>
        Based on this motivation, MySupps was created as a user-friendly web application that helps
        users organize supplements, track intake status and build long-term consistency in their
        daily health and fitness routine.
      </p>

      <h2>Project Goal</h2>
      <p>
        The goal of MySupps is to provide a clean, modern and easy-to-use platform for supplement
        tracking.
      </p>

      <h2>Core Functions</h2>
      <ul>
        <li>Overview of all supplements</li>
        <li>Daily intake status</li>
        <li>Search and filter function</li>
        <li>Clear dosage, category and intake time information</li>
        <li>Simple status update for taken or open supplements</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.about-page {
  max-width: 1000px;
  margin: 0 auto;
}

.about-card {
  padding: 48px;
}

.label {
  color: #a855f7;
  font-weight: 900;
  letter-spacing: 3px;
}

h1 {
  font-size: 58px;
  margin: 14px 0 28px;
}

h2 {
  margin-top: 34px;
  color: #a855f7;
}

p,
li {
  color: #cbd5e1;
  line-height: 1.8;
  font-size: 17px;
}

ul {
  padding-left: 22px;
}

@media (max-width: 768px) {
  .about-page {
    max-width: 1000px;
    padding: 0 16px;
  }

  .about-card {
    padding: 28px;
  }

  h1 {
    font-size: 42px;
  }

  p,
  li {
    font-size: 15px;
  }
}
</style>
