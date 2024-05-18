import { FormEvent, useRef, useCallback, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { useFormToggle } from './hooks/useFormToggle';
import {
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	backgroundColors
} from 'src/constants/articleProps';



type ArticleParamsFormProps = {
	appState: ArticleStateType;
	formState: ArticleStateType;
	applyState: (event: FormEvent) => void;
	resetState: () => void;
	changeFontFamily: (selected: OptionType) => void;
	changeFontColor: (selected: OptionType) => void;
	changeFontSize: (selected: OptionType) => void;
	changeContentWidth: (selected: OptionType) => void;
	changeBackgroundColor: (selected: OptionType) => void;
}


export const ArticleParamsForm = ({
	appState,
	formState,
	applyState,
	resetState,
	changeFontFamily,
	changeFontColor,
	changeFontSize,
	changeContentWidth,
	changeBackgroundColor
}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const { isOpen, toggle } = useFormToggle(false, formRef);

	const handleApplyState = useCallback((event: FormEvent) => {
		event.preventDefault();
		applyState(event);
	}, [applyState]);

	const handleResetState = useCallback(() => {
		resetState();
	}, [resetState]);

	return (
		<>
			<ArrowButton onClick={toggle} isOpen={isOpen} />
			<aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} ref={formRef} onSubmit={handleApplyState}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title='Шрифт'
						onChange={changeFontFamily}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={changeFontSize}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='Цвет шрифта'
						onChange={changeFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='Цвет фона'
						onChange={changeBackgroundColor}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='Ширина контента'
						onChange={changeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetState} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
