package hello.hello.adapters.persistence.database.adapters

import hello.hello.adapters.persistence.database.entities.UserEntity
import hello.hello.adapters.persistence.database.entities.UserTable
import hello.hello.adapters.persistence.database.entities.toUser
import hello.hello.domain.models.User
import hello.hello.domain.ports.UserPort
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction

class UserAdapter: UserPort() {
    override fun checkIfUserExists(username: String): Boolean =
        transaction { findByName(username) != null }

    override fun checkLogin(username: String, password: String): User? =
        transaction { UserEntity.find { (UserTable.name eq username) and (UserTable.password eq password) }.firstOrNull()?.toUser() }

    override fun createNewUser(argName: String, argPassword: String): User =
        transaction {
            UserEntity.new {
                name = argName
                password = argPassword
            }.toUser()
        }

    companion object {
        internal fun findByName(name: String) = UserEntity.find { UserTable.name eq name }.firstOrNull()
    }
}