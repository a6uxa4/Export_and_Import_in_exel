import * as XLSX from 'xlsx'
import { useState } from 'react'
import Modal from './components/Modal'
import Input from './components/Input'
import styled from 'styled-components'

function App() {
	const [data, setData] = useState([])
	const [inputValues, setInputValues] = useState({
		name: '',
		email: '',
		phone: '',
	})
	const [active, setActive] = useState(false)

	const handleFileUpload = (event) => {
		const file = event.target.files[0]
		const reader = new FileReader()
		reader.onload = (event) => {
			const fileData = event.target.result
			const workbook = XLSX.read(fileData, { type: 'binary' })
			const sheetName = workbook.SheetNames[0]
			const sheetData = XLSX.utils.sheet_to_json(
				workbook.Sheets[sheetName],
			)
			setData(sheetData)
		}
		reader.readAsBinaryString(file)
	}

	const handleExportData = () => {
		const headers = ['name', 'email', 'phone']
		const dataRows = data.map((obj) => Object.values(obj))
		const worksheet = XLSX.utils.aoa_to_sheet([headers, ...dataRows])
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
		XLSX.writeFile(workbook, 'data.xlsx')
	}

	function handleClick() {
		setData([
			...data,
			{
				name: inputValues.name,
				email: inputValues.email,
				phone: inputValues.phone,
			},
		])
		setInputValues({
			name: '',
			email: '',
			phone: '',
		})
		setActive(false)
	}

	console.log(data)

	return (
		<StyledContainerApp>
			<input type='file' onChange={handleFileUpload} />
			<button onClick={handleExportData}>EXPORT IN EXEL</button>
			<button onClick={() => setActive(true)}>Добавить User</button>
			<Modal active={active} setActive={setActive}>
				<StyledContainerModal>
					<Input
						value={inputValues.name}
						onChange={(e) =>
							setInputValues({
								...inputValues,
								name: e.target.value,
							})
						}
						label='Фио'
					/>
					<Input
						value={inputValues.email}
						onChange={(e) =>
							setInputValues({
								...inputValues,
								email: e.target.value,
							})
						}
						label='Email'
					/>
					<Input
						value={inputValues.phone}
						onChange={(e) =>
							setInputValues({
								...inputValues,
								phone: e.target.value,
							})
						}
						label='Номер'
					/>
					<StyledButton onClick={() => handleClick()}>
						Добавить
					</StyledButton>
				</StyledContainerModal>
			</Modal>
			<StyledContainerTable>
				{data.length ? (
					<StyledTable>
						<StyeldThead>
							<div>Name</div>
							<div>Email</div>
							<div>Phone</div>
						</StyeldThead>
						{data.map((item) => {
							return (
								<StyledTbody key={item.name}>
									<div>{item.name}</div>
									<div>{item.email}</div>
									<div>{item.phone}</div>
								</StyledTbody>
							)
						})}
					</StyledTable>
				) : (
					''
				)}
			</StyledContainerTable>
		</StyledContainerApp>
	)
}

const StyledContainerApp = styled.div`
	margin-top: 100px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	button {
		:nth-child(2) {
			width: 250px;
			height: 40px;
			border-radius: 8px;
			border: 1px solid gray;
			font-size: 14px;
			background-color: #0787c9;
			color: white;
			font-size: 16px;
		}
		:nth-child(3) {
			width: 250px;
			height: 40px;
			border-radius: 8px;
			border: 1px solid gray;
			font-size: 14px;
			background-color: green;
			color: white;
			font-size: 16px;
		}
	}
`

const StyledContainerTable = styled.div`
	margin-top: 100px;
`
const StyledTbody = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	div {
		font-size: 16px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		:nth-child(1) {
			width: 35%;
		}
		:nth-child(2) {
			width: 35%;
		}
		:nth-child(3) {
			width: 35%;
		}
	}
`
const StyledTable = styled.div``
const StyeldThead = styled.div`
	width: 100%;
	height: 40px;
	background-color: #f2f6fa;
	display: flex;
	div {
		font-size: 16px;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		:nth-child(1) {
			width: 35%;
		}
		:nth-child(2) {
			width: 35%;
		}
		:nth-child(3) {
			width: 35%;
		}
	}
`

const StyledContainerModal = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

const StyledButton = styled.button`
	width: 100px;
	height: 30px;
	border-radius: 8px;
	border: 1px solid gray;
	font-size: 14px;
	background-color: #0787c9;
	color: white;
	font-size: 16px;
`

export default App
