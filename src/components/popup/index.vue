<template>
  <div class="overlay">
    <div class="popup">
      <form class="form" @submit.prevent>
        <label class="form__label" for="title">Title:</label>
        <input
          type="text"
          v-model="title"
          class="form__input"
          id="title"
          autocomplete="off"
        />

        <label class="form__label" for="description">
          Description (optional):
        </label>
        <textarea
          v-model="description"
          rows="3"
          class="form__textarea"
          id="description"
          autocomplete="off"
        />

        <div class="radio_list">
          <p class="radio_list__name">Priority:</p>
          <div class="radio_options">
            <input
              type="radio"
              value="High"
              v-model="priority"
              class="radio_options__option"
              id="high"
            />
            <label class="radio_options__label radio_options--high" for="high">
              High
            </label>
            <input
              type="radio"
              value="Medium"
              v-model="priority"
              class="radio_options__option"
              checked
              id="medium"
            />
            <label
              class="radio_options__label radio_options--medium"
              for="medium"
            >
              Medium
            </label>
            <input
              type="radio"
              value="Low"
              v-model="priority"
              class="radio_options__option"
              id="low"
            />
            <label class="radio_options__label radio_options--low" for="low">
              Low
            </label>
          </div>
        </div>
      </form>
      <div class="btn_container">
        <button @click="$emit('cancel')" class="btn btn--secondary">
          Cancel
        </button>
        <button
          @click="$emit('submit')"
          class="btn btn--primary"
          :disabled="isSubmitDisabled"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    title: "",
    description: "",
    priority: "",
  }),
  computed: {
    isSubmitDisabled() {
      return !this.title || !this.priority;
    },
  },
});
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 5;
}

.popup {
  box-sizing: border-box;
  border-radius: 20px;
  background-color: white;
  margin: auto;
  width: 90%;
  margin-top: 20vh;
  padding: 1.5rem;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);

  @include desktop {
    max-width: 30rem;
    padding: 2rem;
  }
}

.form {
  display: flex;
  flex-direction: column;

  &__label {
    display: block;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  &__input,
  &__textarea {
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 0.75rem;
    padding: 0.5rem 0.5rem;
    font-size: 1.1rem;
  }

  &__textarea {
    resize: none;
  }
}

.radio_list {
  &__name {
    margin: 0 0 0.5rem 0;
  }
}

.radio_options {
  display: flex;
  justify-content: space-evenly;

  &__option {
    display: none;

    &:checked + .radio_options__label {
      background-color: #bbb;
    }

    &:checked + .radio_options--high {
      background-color: $high-priority;
    }

    &:checked + .radio_options--medium {
      background-color: $medium-priority;
    }

    &:checked + .radio_options--low {
      background-color: $low-priority;
    }
  }

  &__label {
    display: inline-block;
    background-color: #ddd;
    padding: 4px 11px;
    font-family: Arial;
    font-size: 16px;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 5px;

    @include desktop {
      padding: 0.75rem 1.5rem;
    }
  }

  &--high {
    &:hover {
      background-color: $high-priority;
    }
  }

  &--medium {
    &:hover {
      background-color: $medium-priority;
    }
  }

  &--low {
    &:hover {
      background-color: $low-priority;
    }
  }
}

.btn_container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.btn {
  outline: none;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;

  @include desktop {
    padding: 1rem 2rem;
  }

  &:hover,
  &:focus {
    opacity: 0.5;
  }

  &:disabled {
    opacity: 0.8;
    cursor: initial;
  }

  &:first-of-type {
    margin-right: 1.5rem;
  }

  &--primary {
    background-color: $primary-blue;
  }

  &--secondary {
    background-color: $primary-orange;
  }
}
</style>
