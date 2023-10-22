import { createStore } from 'vuex';
import { ICharacter, ICharacterInfo, ICharacterInfoExtended } from '@/scripts/interfaces';
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
        return this.pageCurrent === 1 || this.pageNextUrl;
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
    async loadCharacters(context) {
      context.commit('clearCharactersData');

      context.commit('startLoadingNewPage');
      while (context.state.charactersInfo.loading()) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const response = await apiLoadCharacters(context.state.charactersInfo.pageCurrent);

          context.commit('updateCharactersInfo', response.info);
          context.commit('addCharacters', response.results);
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
    },
  },
  modules: {},
});
