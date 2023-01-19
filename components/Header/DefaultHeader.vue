<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/decks">Decks</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/profile">Profile</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/settings">Settings</nuxt-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'DefaultHeader',
}
</script>

<style lang="scss" scoped>
header {
  background: grey;
  color: aliceblue;
  height: 60px;
  nav,
  ul {
    height: inherit;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      margin: 0 1.5rem;
      a {
        color: white;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
        &.nuxt-link-exact-active {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>
