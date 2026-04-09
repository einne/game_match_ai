<template>
  <section class="row justify-content-center">
    <div class="col-md-7 col-lg-6">
      <div class="card shadow-sm border-0">
        <div class="card-body p-4">
          <h2 class="h4 mb-3">Register</h2>
          <form>
            <div class="mb-3">
              <label class="form-label" for="username">Username</label>
              <input id="username" type="text" class="form-control" placeholder="Game nickname" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="registerEmail">Email</label>
              <input id="registerEmail" type="email" class="form-control" placeholder="you@example.com" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="registerPassword">Password</label>
              <input id="registerPassword" type="password" class="form-control" placeholder="Create password" />
            </div>
            <button type="submit" class="btn btn-success w-100" disabled>Create Account (Coming Soon)</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
