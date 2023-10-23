<template>
  <div class="panel">
    <span class="panel__label">Сортировать по:</span>
    <SortButton
      dataId="sort-btn-gender"
      class="panel__btn"
      caption="ПОЛ"
      v-model="sortsEdited.gender"
      :disabled="disabled"
    />
    <SortButton
      dataId="sort-btn-name"
      class="panel__btn"
      caption="ИМЯ"
      v-model="sortsEdited.name"
      :disabled="disabled"
    />
    <SortButton
      dataId="sort-btn-origin"
      class="panel__btn"
      caption="ПРОИСХОЖДЕНИЕ"
      v-model="sortsEdited.origin"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import ButtonSort from '@/components/ButtonSort.vue';
import { ICharacterSorts } from '@/scripts/interfaces';

export default defineComponent({
  name: 'PanelSorts',
  components: { SortButton: ButtonSort },
  props: {
    sorts: {
      type: Object as PropType<ICharacterSorts>,
      required: true,
    },
    disabled: Boolean,
  },
  data() {
    return {
      sortsEdited: {
        gender: 'none',
        name: 'none',
        origin: 'none',
      } as ICharacterSorts,
    };
  },
  watch: {
    sortsEdited: {
      handler() {
        this.changeSorts();
      },
      deep: true,
    },
  },
  emits: ['update:sorts'],
  methods: {
    changeSorts() {
      this.$emit('update:sorts', this.sortsEdited);
    },
  },
  created() {
    this.sortsEdited = this.sorts;
  },
});
</script>

<style lang="sass" scoped>
.panel
  display: flex
  align-items: center
  &__label
    margin-right: 10px
  &__btn
    padding-top: 2px
    padding-bottom: 2px
    &:not(:last-child)
      margin-right: 10px
</style>
