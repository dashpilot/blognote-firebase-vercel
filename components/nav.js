const template = `
<div x-data="navApp()">
<nav class="navbar is-info" role="navigation" aria-label="main navigation">
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-brand">
      <a class="navbar-item">
        <strong class="ml">BlogNote</strong>
      </a>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons" id="authContainer">

        </div>
      </div>
    </div>
  </div>
</nav>
</div>
`

export default () => {
  return {
    template: template,
    init() {
      console.log('navbar component loaded');
    }
  }
}