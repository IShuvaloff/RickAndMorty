import { createStore } from 'vuex';
import {
  ICharacter,
  ICharacterInfo,
  ICharacterInfoExtended,
  ILink,
  isILink,
} from '@/scripts/interfaces';
import apiLoadCharacters from '@/scripts/api';

export default createStore({
  state: {
    charactersInfo: {
      characters: 0,
      pages: 0,
      pageCurrent: 0,
      pageNextUrl: '',
      pagePrevUrl: '',
      error: false,
      errorText: '',
      loading() {
        // загрузка всегда для 1-й страницы (пока еще не были загружены данные о числе страниц)
        // и для последней (пока еще не были загружены данные о том, что новых страниц не будет)
        return this.pageCurrent === 1 || !!this.pageNextUrl;
      },
      loadingState() {
        if (this.pages === 0) return 0;
        return Math.round((this.pageCurrent * 100) / this.pages) / 100;
      },
    } as ICharacterInfoExtended,
    characters: [] as ICharacter[],
  },
  getters: {
    getCharacters(state) {
      return state.characters;
    },
    getCharactersInfo(state) {
      return state.charactersInfo;
    },
  },
  mutations: {
    startLoadingNewPage(state) {
      // eslint-disable-next-line no-plusplus
      state.charactersInfo.pageCurrent++;
    },
    addCharacters(state, list: [ICharacter]) {
      list.forEach((item) => {
        state.characters.push(item);
      });
    },
    sortReset(state) {
      state.characters.sort((a, b) => a.id - b.id);
    },
    sortCharacters(state, sorts) {
      // ! отфильтровать лишние поля, по которым нет сортировки. При пустом списке сортировать по ID
      const sortPairs = Object.entries(sorts).filter((item) => item[1] !== 'none');

      if (!sortPairs.length) {
        state.characters.sort((a, b) => a.id - b.id);
        return;
      }

      state.characters.sort((a, b) => {
        let result = 0;

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < sortPairs.length; i++) {
          const field = sortPairs[i][0];
          const direction = sortPairs[i][1] === 'asc' ? 1 : -1;

          let valueA = a[field as keyof ICharacter];
          let valueB = b[field as keyof ICharacter];

          switch (typeof valueA) {
            case 'string':
              result = result || valueA.localeCompare(valueB as string) * direction;
              break;
            case 'number':
              result = result || (valueA - (valueB as number)) * direction;
              break;
            case 'object':
              if (isILink(valueA)) {
                valueA = valueA.name;
                valueB = (valueB as ILink).name;
                result = result || valueA.localeCompare(valueB) * direction;
              }
              break;
            default:
              break;
          }
        }

        return result;
      });
    },
    updateCharactersInfo(state, info: ICharacterInfo) {
      if (state.charactersInfo.characters !== info.count) {
        state.charactersInfo.characters = info.count;
      }
      if (state.charactersInfo.pages !== info.pages) {
        state.charactersInfo.pages = info.pages;
      }
      state.charactersInfo.pageNextUrl = info.next ?? '';
      state.charactersInfo.pagePrevUrl = info.prev ?? '';
    },
    setCharacterInfoError(state, message) {
      state.charactersInfo.error = true;
      state.charactersInfo.errorText = message;
    },
    clearCharactersData(state) {
      state.characters = [];
      state.charactersInfo.characters = 0;
      state.charactersInfo.pages = 0;
      state.charactersInfo.pageCurrent = 0;
      state.charactersInfo.pageNextUrl = '';
      state.charactersInfo.pagePrevUrl = '';
      state.charactersInfo.error = false;
      state.charactersInfo.errorText = '';
    },
  },
  actions: {
    async loadCharacters(context, sorts = null) {
      context.commit('clearCharactersData');

      // ! отлов ошибок без возврата наверх
      try {
        context.commit('startLoadingNewPage');
        while (context.state.charactersInfo.loading()) {
          try {
            // eslint-disable-next-line no-await-in-loop
            const response = await apiLoadCharacters(context.state.charactersInfo.pageCurrent);

            context.commit('updateCharactersInfo', response.info);
            context.commit('addCharacters', response.results);

            if (sorts) context.commit('sortCharacters', sorts);
          } catch (err) {
            if (err instanceof Error) {
              const message = `Ошибка загрузки персонажей со страницы ${context.state.charactersInfo.pageCurrent}: ${err.message}`;

              context.commit('setCharacterInfoError', message);
              throw new Error(`Ошибка загрузки списка персонажей с сервера: ${message}`);
            }
          } finally {
            if (context.state.charactersInfo.loadingState() < 1) {
              context.commit('startLoadingNewPage');
            }
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    },
  },
  modules: {},
});
