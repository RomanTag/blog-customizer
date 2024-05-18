import { CSSProperties, useState, FormEvent } from "react";
import { Article } from "../article";
import { ArticleParamsForm } from "../article-params-form";
import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from '../../constants/articleProps'
import { useLocalStorage } from "./hooks/useLocalStorage";
import '../../styles/index.scss'
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [appState, setAppState] = useLocalStorage<ArticleStateType>(
		'state',
		defaultArticleState
	);

	const [formState, setFormState] = useState(appState);

	const resetState = () => {
		setAppState(defaultArticleState);
		setFormState(defaultArticleState);
	}

	const applyState = (event: FormEvent) => {
		event.preventDefault();
		setAppState(formState);
	};

	const handleChange = (field: keyof ArticleStateType) => (selected: OptionType) => {
		setFormState(prevState => ({ ...prevState, [field]: selected }));
	}
	// const changeFontFamily = (selected: OptionType) => {
	// 	setFormState({ ...formState, fontFamilyOption: selected });
	// };

	// const changeFontColor = (selected: OptionType) => {
	// 	setFormState({ ...formState, fontColor: selected });
	// };

	// const changeBackgroundColor = (selected: OptionType) => {
	// 	setFormState({ ...formState, backgroundColor: selected });
	// };

	// const changeContentWidth = (selected: OptionType) => {
	// 	setFormState({ ...formState, contentWidth: selected });
	// };

	// const changeFontSize = (selected: OptionType) => {
	// 	setFormState({ ...formState, fontSizeOption: selected });
	// };

	const props = {
		appState,
		formState,
		applyState,
		resetState,
		changeBackgroundColor: handleChange('backgroundColor'),
		changeFontColor: handleChange('fontColor'),
		changeFontFamily: handleChange('fontFamilyOption'),
		changeFontSize: handleChange('fontSizeOption'),
		changeContentWidth: handleChange('contentWidth')
	};

	const mainStyle: CSSProperties = {
		'--font-family': appState.fontFamilyOption.value,
		'--font-size': appState.fontSizeOption.value,
		'--font-color': appState.fontColor.value,
		'--container-width': appState.contentWidth.value,
		'--bg-color': appState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main
			className={styles.main}
			style={mainStyle}>
			<ArticleParamsForm {...props} />
			<Article />
		</main>
	);
};