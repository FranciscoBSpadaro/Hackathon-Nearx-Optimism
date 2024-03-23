"""
Automation for update debug section in front-end
Script para atualizar o debug do front-end
Para ambiemte de Desenvolvimento
Não necessario para desenvolvimento do contrato
"""
import os
from dataclasses import dataclass, field
from json import dumps, load
import json
from typing import List


@dataclass
class Contract:
    """
    # Contract must have:
    - contractAddress: str
    - contractName: str
    - abi: list
    """

    name: str
    address: str
    abi: list = field(default_factory=list)


CHAIN_ID = 31337
CONTRACT_SCRIPT_NAME = "deploy.local.s.sol"
TRANSACTIONS_PATH = f"broadcast/{CONTRACT_SCRIPT_NAME}/{CHAIN_ID}/run-latest.json"
TARGET_DIR = "../frontend/generated/deployedContracts.ts"



def abi_path(name) -> str:
    return f"artifacts/{name}.sol/{name}.json"


with open(TRANSACTIONS_PATH) as deployed_contracts:
    json_file = load(deployed_contracts)
    transactions = json_file["transactions"]
    contracts: List[Contract] = []

    for contract in transactions:
        if contract["transactionType"] == "CREATE":
            name, address = contract["contractName"], contract["contractAddress"]
            with open(abi_path(name)) as full_abi_json:
             data = json.load(full_abi_json)
             contracts.append(Contract(name, address, data))



json_config = {
    CHAIN_ID: [{"name": "localhost", "chainId": str(CHAIN_ID), "contracts": {}}]
}


for contract in contracts:
    json_config[CHAIN_ID][0]["contracts"][contract.name] = {
        "address": contract.address,
        "abi": contract.abi,
    }


typescript_content = f"const deployedContracts = {dumps(json_config)} as const; \n\n export default deployedContracts"

# Garante que o arquivo possa ser escrito
os.chmod(TARGET_DIR, 0o777)

# Cria o diretório se ele não existir
os.makedirs(TARGET_DIR, exist_ok=True)

with open(TARGET_DIR, "w") as ts_file:
    ts_file.write(typescript_content)
