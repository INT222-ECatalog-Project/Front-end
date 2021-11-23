<template>
  <div class="notifications">
    <div class="notification">
      <div class="noti-tab"></div>
      <i class="fas fa-check-circle icon"></i>
      <div class="noti-text">
        <div class="noti-header">
          Success
        </div>
        <div class="noti-description">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notfication",
};
</script>

<style scoped>
.notifications {
  position: fixed;
  background-color: white;
  bottom: 0%;
  right: 0%;
  margin: 0 1.4rem 1.4rem 0;
  height: fit-content;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  animation: appears-from-bottom 0.75s 1 ease;
}
.notification {
  display: flex;
  position: relative;
  height: 100%;
  align-items: center;
}
.notification .icon {
  margin-left: 2rem;
  font-size: 2.4rem;
  color: #35e08e;
}
.noti-tab {
  position: absolute;
  width: 0.6rem;
  height: 100%;
  background-color: #35e08e;
}
.noti-text {
  margin-left: 1rem;
  padding: 1.4rem 12rem 1.4rem 1.4rem;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: #555;
}
.noti-header {
  font-weight: 700;
  color: #35e08e;
  font-size: 1.4rem;
}
</style>>

