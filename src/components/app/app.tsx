import { CSSProperties } from 'react';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import { useLocalStorage } from './hooks/useLocalStorage';
import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [appState, setAppState] = useLocalStorage<ArticleStateType>(
		'state',
		defaultArticleState
	);

	const applyState = (newState: ArticleStateType) => {
		setAppState(newState);
	};

	const mainStyle: CSSProperties = {
		'--font-family': appState.fontFamilyOption.value,
		'--font-size': appState.fontSizeOption.value,
		'--font-color': appState.fontColor.value,
		'--container-width': appState.contentWidth.value,
		'--bg-color': appState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={mainStyle}>
			<ArticleParamsForm initialState={appState} onApply={applyState} />
			<Article />
		</main>
	);
};
