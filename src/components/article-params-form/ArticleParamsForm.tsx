import { FormEvent, useRef, useState } from 'react';
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
	backgroundColors,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(initialState);
	const formRef = useRef<HTMLFormElement | null>(null);
	const { isOpen, toggle } = useFormToggle(false, formRef);

	const handleApplyState = (event: FormEvent) => {
		event.preventDefault();
		onApply(formState);
		toggle();
	};

	const handleResetState = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		toggle();
	};

	const handleChange =
		(field: keyof ArticleStateType) => (selected: OptionType) => {
			setFormState((prevState) => ({ ...prevState, [field]: selected }));
		};

	return (
		<>
			<ArrowButton onClick={toggle} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, styles.scrollbar, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={handleApplyState}
					onReset={handleResetState}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title='Шрифт'
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='Цвет шрифта'
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='Цвет фона'
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='Ширина контента'
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
