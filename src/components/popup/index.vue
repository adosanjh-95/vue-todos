<template>
  <div class="overlay">
    <div class="popup">
      <form class="form" @submit.prevent>
        <label class="form__label" for="title">Title:</label>
        <input
          type="text"
          v-model="todoTitle"
          class="form__input"
          id="title"
          autocomplete="off"
        />

        <label class="form__label" for="description">
          Description (optional):
        </label>
        <textarea
          v-model="todoDescription"
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
              v-model="todoPriority"
              class="radio_options__option"
              id="high"
            />
            <label class="radio_options__label radio_options--high" for="high">
              High
            </label>
            <input
              type="radio"
              value="Medium"
              v-model="todoPriority"
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
              v-model="todoPriority"
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
          @click="handleSubmit"
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
  props: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    priority: { type: String, default: "" },
    id: { type: String, default: null },
  },
  data() {
    return {
      todoTitle: this.title,
      todoDescription: this.description,
      todoPriority: this.priority,
    };
  },
  methods: {
    handleSubmit() {
      this.$emit(
        "submit",
        {
          title: this.todoTitle,
          description: this.todoDescription,
          priority: this.todoPriority,
        },
        this.$props.id
      );
    },
  },
  computed: {
    isSubmitDisabled(): boolean {
      return !this.todoTitle || !this.todoPriority;
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
  border-radius: $border-radius;
  background-color: white;
  margin: auto;
  margin-top: 20vh;
  padding: 1.5rem;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
  font-size: 0.8rem;
  width: 90%;
  max-width: 25rem;

  @include desktop {
    max-width: 30rem;
    padding: 2rem;
    font-size: 1rem;
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
    font-size: 0.9rem;

    @include desktop {
      font-size: 1.1rem;
    }
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
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 0.8rem;

    @include desktop {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
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
  font-size: 0.8rem;

  @include desktop {
    padding: 1rem 2rem;
    font-size: 1rem;
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
